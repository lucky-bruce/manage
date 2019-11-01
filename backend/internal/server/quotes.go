package server

import (
	"context"
	"encoding/json"
	"os"
	"time"

	"github.com/Beaxhem/manage/backend/internal/authorization"
	"github.com/Beaxhem/manage/backend/internal/db"
	"github.com/Beaxhem/manage/backend/internal/logger"
	"github.com/Beaxhem/manage/backend/internal/products"
	"github.com/Beaxhem/manage/backend/internal/quotes"
	"github.com/Beaxhem/manage/backend/internal/utils"
	"github.com/dgrijalva/jwt-go"
	qrcode "github.com/skip2/go-qrcode"
	"gopkg.in/mgo.v2/bson"
)

func (s *Server) NewQuote(ctx context.Context, quote *quotes.Quote) (*quotes.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "quotes")

	user, err := authorization.ValidateJWT(quote.GetJwt())
	if err != nil {
		logger.ErrorFunc(err)
		return new(quotes.Response), err
	}

	quote.Userid = user.(jwt.MapClaims)["id"].(string)
	quote.Status = quotes.Status_NEW
	quote.Timestamp = time.Now().Unix()
	err = db.IdGenerator(quote)
	if err != nil {
		logger.ErrorFunc(err)
		return new(quotes.Response), err
	}
	err = store.Insert(quote)

	return &quotes.Response{Id: quote.GetId()}, err
}

func (s *Server) GetQuotes(ctx context.Context, query *products.Query) (*quotes.QuoteResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "quotes")

	querystring := query.Querystring
	sortFields := query.SortFields
	var q []*quotes.Quote

	qu, _ := utils.GetQuery(querystring)

	err := store.GetAll(&q, sortFields, qu)

	return &quotes.QuoteResponse{Quotes: q}, err
}

func (s *Server) GetQuoteByID(ctx context.Context, quote *quotes.QuoteParams) (*quotes.Quote, error) {
	id := quote.GetID()

	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "quotes")

	var q quotes.Quote

	err := store.GetElementByID(id, &q)
	return &q, err
}

func (s *Server) DeleteQuote(ctx context.Context, quoteParams *quotes.QuoteParams) (*quotes.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "quotes")
	var quote quotes.Quote
	err := store.GetElementByID(quoteParams.GetID(), &quote)
	if err != nil {
		return new(quotes.Response), err
	}
	err = store.DeleteElementByID(quoteParams.GetID())

	go DeleteIncome(&quote)

	return new(quotes.Response), err

}

func (s *Server) EditQuote(ctx context.Context, quote *quotes.Quote) (*quotes.Response, error) {

	var valid = true
	for _, v := range quote.Supplierids {
		if v.Valid == false {
			valid = false
		}
	}

	if valid {
		if quote.Status == 0 {
			quote.Status = 1.0
		}

	}

	if quote.Status == quotes.Status_CLIENT_APPLIED {

		go DeleteIncome(quote)

		go NewIncome(quote)

		go NewQRCode(quote)
		quote.Qrcodeurl = "images/qrcode/" + quote.Id + ".png"
	}

	m := make(map[string]interface{})
	b, err := json.Marshal(quote)
	if err != nil {
		logger.ErrorFunc(err)
		return new(quotes.Response), err
	}

	err = json.Unmarshal(b, &m)
	if err != nil {
		logger.ErrorFunc(err)
		return new(quotes.Response), err
	}

	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "quotes")

	err = store.EditByID(quote.GetId(), m)

	return new(quotes.Response), err
}

func NewQRCode(quote *quotes.Quote) {
	var png []byte
	png, err := qrcode.Encode("http://192.168.0.107:3000/quote/"+quote.Id+"/status-update", qrcode.Medium, 256)
	if err != nil {
		logger.ErrorFunc(err)
		return
	}

	f, err := os.Create("images/qrcode/" + quote.Id + ".png")
	if err != nil {
		logger.ErrorFunc(err)
		return
	}

	defer f.Close()

	f.Write(png)
}

func (s *Server) ChangeShippingStatus(ctx context.Context, params *quotes.StatusParams) (*quotes.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "quotes")

	if params.GetStatus() != 0 {

		err := store.C.Update(bson.M{"id": params.Id}, bson.M{"$set": bson.M{"shipping": params.Status}})
		if err != nil {
			logger.ErrorFunc(err)

		}
		return new(quotes.Response), err
	}

	err := store.C.Update(bson.M{"id": params.Id}, bson.M{"$inc": bson.M{"shipping": 1}})
	if err != nil {
		logger.ErrorFunc(err)
		return new(quotes.Response), err
	}

	return new(quotes.Response), err
}

func (s *Server) GetStatistics(ctx context.Context, q *products.Query) (*quotes.Stats, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "quotes")

	var query interface{}
	if q != nil {
		query, _ = utils.GetQuery(q.Querystring)
	}

	var qts []*quotes.Quote
	err := store.GetAll(&qts, nil, query)
	if err != nil {
		logger.ErrorFunc(err)
		return new(quotes.Stats), err
	}

	var stats quotes.Stats

	for _, quote := range qts {
		if quote.Status == quotes.Status_NEW {
			stats.Pending++
			stats.New++
			continue
		}

		if quote.Status == quotes.Status_SUPPLIER_REJECTED || quote.Status == quotes.Status_CLIENT_REJECTED {
			stats.Denied++
			stats.Cancelled++
			continue
		}

		if quote.Status == quotes.Status_CLIENT_APPLIED {
			stats.Active++
			stats.Applied++
			continue
		}

		if quote.Status == quotes.Status_PREPARATION {
			stats.Preparation++
			continue
		}

		if quote.Status == quotes.Status_PRODUCTION {
			stats.Production++
			continue
		}

		if quote.Status == quotes.Status_DELIVERED {
			stats.Delivered++
			continue
		}

		if quote.Status == quotes.Status_COMPLETED {
			stats.Completed++
			continue
		}

		if quote.Status == quotes.Status_CANCELLED {
			stats.Cancelled++
			continue
		}
	}

	return &stats, nil
}
