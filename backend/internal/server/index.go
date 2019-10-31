package server

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"os"
	"path/filepath"
	"strings"
	"time"

	"googlemaps.github.io/maps"
	"gopkg.in/mgo.v2/bson"

	"github.com/Beaxhem/manage/backend/internal/chunker"
	"github.com/Beaxhem/manage/backend/internal/financial"
	"github.com/Beaxhem/manage/backend/internal/services"
	"github.com/chai2010/webp"
	"github.com/kr/pretty"

	"github.com/Beaxhem/manage/backend/internal/logger"
	"github.com/Beaxhem/manage/backend/internal/quotes"
	"github.com/Beaxhem/manage/backend/internal/utils"

	"github.com/dgrijalva/jwt-go"

	"github.com/Beaxhem/manage/backend/internal/authorization"
	"github.com/Beaxhem/manage/backend/internal/db"
	"github.com/Beaxhem/manage/backend/internal/products"
)

type Server struct{}

const chunkSize = 64 * 1024 // 64 KiB

func (s *Server) NewProduct(ctx context.Context, product *products.Product) (*products.Product, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	err := db.IdGenerator(product)

	product.Sellingprice = product.Buyingprice + (product.Desiredprofit*product.Buyingprice)/100

	err = store.Insert(product)
	return product, err
}

func (s *Server) GetProducts(ctx context.Context, productParams *products.ProductParams) (*products.ProductResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")
	q := productParams.GetQuery()
	query, _ := utils.GetQuery(q.GetQuerystring())

	var p []*products.Product

	err := store.GetAll(&p, nil, query)

	return &products.ProductResponse{Products: p}, err
}

func (s *Server) GetProductByID(ctx context.Context, productParams *products.ProductParams) (*products.Product, error) {
	id := productParams.GetId()

	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	var p products.Product

	err := store.GetElementByID(id, &p)

	return &p, err

}

func (s *Server) EditProduct(ctx context.Context, product *products.Product) (*products.EmptyResponse, error) {
	m := make(map[string]interface{})
	b, err := json.Marshal(product)
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.EmptyResponse), err
	}

	err = json.Unmarshal(b, &m)
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.EmptyResponse), err
	}

	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	err = store.EditByID(product.GetId(), m)

	return new(products.EmptyResponse), err
}

func (s *Server) DeleteProductByID(ctx context.Context, productParams *products.ProductParams) (*products.EmptyResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	var product products.Product
	err := store.GetElementByID(productParams.Id, product)
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.EmptyResponse), err
	}
	go DeleteFiles(product)

	err = store.DeleteElementByID(productParams.GetId())

	return new(products.EmptyResponse), err
}

func DeleteFiles(product products.Product) {
	for _, v := range product.Images {
		err := os.Remove(v)
		if err != nil {
			logger.ErrorFunc(err)
			return
		}
	}
}

func (s *Server) Chunker(req *chunker.Request, srv chunker.Chunker_ChunkerServer) error {
	path, err := filepath.Abs(req.Url)

	file, err := os.Open(path)

	if err != nil {
		logger.ErrorFunc(err)
		return err
	}

	img, _, err := image.Decode(file)

	buf := new(bytes.Buffer)
	err = webp.Encode(buf, img, nil)
	if err != nil {
		logger.ErrorFunc(err)
		return err
	}

	c := buf.Bytes()
	chnk := &chunker.Chunk{}

	for currentByte := 0; currentByte < len(c); currentByte += chunkSize {
		if currentByte+chunkSize > len(c) {
			chnk.Chunk = c[currentByte:len(c)]
		} else {
			chnk.Chunk = c[currentByte : currentByte+chunkSize]
		}
		if err := srv.Send(chnk); err != nil {
			return err
		}
	}

	return nil
}

func (s *Server) UploadImage(ctx context.Context, img *products.Image) (*products.ImageResponse, error) {

	i := strings.Index(img.Image, ",")
	if i < 0 {
		logger.ErrorFunc("Bad image data")
		return new(products.ImageResponse), errors.New("Bad image data")
	}

	dec := base64.NewDecoder(base64.StdEncoding, strings.NewReader(img.Image[i+1:]))

	fp := fmt.Sprintf("images/%d/%d/%d", time.Now().Year(), time.Now().Month(), time.Now().Day())
	err := os.MkdirAll(fp, 0777)
	if err != nil {
		logger.ErrorFunc("os.MkdirAll(fp, 0777) error:", err)
		return new(products.ImageResponse), err
	}

	var decImg image.Image
	if ext := filepath.Ext(img.Ext); ext == ".png" {
		decImg, err = png.Decode(dec)
	} else if ext == ".jpeg" {
		decImg, err = jpeg.Decode(dec)
	} else if ext == ".gif" {
		decImg, err = gif.Decode(dec)
	} else {
		decImg, _, err = image.Decode(dec)
	}

	if err != nil {
		logger.ErrorFunc("image.Decode(src) error:", err)
		return new(products.ImageResponse), err
	}

	dst, err := os.Create(fp + "/" + fmt.Sprintf("%d.webp", time.Now().Unix()))
	if err != nil {
		logger.ErrorFunc("os.Create(src) error:", err)
		return new(products.ImageResponse), err
	}
	defer dst.Close()
	err = webp.Encode(dst, decImg, &webp.Options{Quality: 80})

	if err != nil {
		logger.ErrorFunc("webp.Encode(src) error:", err)
		return new(products.ImageResponse), err
	}

	return &products.ImageResponse{Url: dst.Name()}, nil

}

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

	if quote.Status == 2.0 {

		go DeleteIncome(quote)

		go NewIncome(quote)

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
			continue
		}
	}

	return &stats, nil
}

func (s *Server) GetService(ctx context.Context, params *services.Params) (*services.Service, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "services")

	var query interface{}
	if params.GetQuery() != nil {
		query, _ = utils.GetQuery(params.GetQuery().Querystring)
	}

	var service services.Service
	err := store.GetElement(&service, query)
	if err != nil {
		logger.ErrorFunc(err)
		return new(services.Service), err
	}

	return &service, nil
}

func (s *Server) GetServices(ctx context.Context, params *services.Params) (*services.ServicesResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "services")

	var query interface{}
	if params.GetQuery() != nil {
		query, _ = utils.GetQuery(params.GetQuery().Querystring)
	}

	var srvs []*services.Service
	err := store.GetAll(&srvs, nil, query)
	if err != nil {
		logger.ErrorFunc(err)
		return new(services.ServicesResponse), err
	}

	return &services.ServicesResponse{Services: srvs}, nil
}

func (s *Server) NewService(ctx context.Context, service *services.Service) (*services.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "services")

	err := db.IdGenerator(service)
	if err != nil {
		logger.ErrorFunc(err)
		return new(services.Response), err
	}

	err = store.Insert(service)
	if err != nil {
		logger.ErrorFunc(err)
		return new(services.Response), err

	}

	return new(services.Response), err
}

func (s *Server) EditService(ctx context.Context, service *services.Service) (*services.Response, error) {
	return nil, nil
}

func (s *Server) DeleteService(ctx context.Context, params *services.Params) (*services.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "services")

	err := store.DeleteElementByID(params.Id)
	if err != nil {
		logger.ErrorFunc(err)
		return new(services.Response), err
	}

	return new(services.Response), err
}

func (s *Server) Login(ctx context.Context, logParams *authorization.LoginParams) (*authorization.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "users")
	return store.Login(logParams)
}

func (s *Server) Register(ctx context.Context, user *authorization.User) (*authorization.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "users")

	return store.Register(user)

}

func (s *Server) GetUser(ctx context.Context, params *authorization.Params) (*authorization.User, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "users")

	var user authorization.User
	err := store.GetElement(&user, bson.M{"id": params.Id})
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.User), err
	}

	return &user, err
}

func (s *Server) GetUsers(ctx context.Context, params *authorization.Params) (*authorization.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "users")

	var query interface{}
	if params.GetQuery() != nil {
		query, _ = utils.GetQuery(params.GetQuery().Querystring)
	}

	var users []*authorization.User
	err := store.GetAll(&users, nil, query)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	return &authorization.Response{Users: users}, nil

}

func (s *Server) GetStats(ctx context.Context, params *authorization.Params) (*authorization.Stats, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "quotes")

	var qts []*quotes.Quote
	var query interface{}
	if q := params.GetQuery(); q != nil {
		query, _ = utils.GetQuery(q.Querystring)
	}

	err := store.GetAll(&qts, nil, query)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Stats), err
	}

	var statts authorization.Stats

	statts.Quotes += uint32(len(qts))
	for _, quote := range qts {
		if quote.Status == quotes.Status_NEW {
			statts.New++
		}
		if quote.Shipping == quotes.ShippingStatus_COMPLETED {
			statts.Completed++
		}

	}

	return &statts, nil
}

func (s *Server) GetIncome(ctx context.Context, params *financial.Params) (*financial.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "income")

	var payoffs []*financial.Payoff
	var query interface{}
	var sortFields []string
	if params.GetQuery() != nil {
		query, _ = utils.GetQuery(params.GetQuery().Querystring)
		sortFields = params.GetQuery().SortFields
	}

	err := store.GetAll(&payoffs, sortFields, query)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.Response), err
	}

	return &financial.Response{Income: payoffs}, nil
}

func NewIncome(quote *quotes.Quote) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "income")

	for _, sup := range quote.Supplierids {
		var total float32
		var totalWithProfit float32
		sector := make(map[string]float32)

		for _, p := range quote.Products {
			if p.Product.Userid == sup.Id {
				sector[p.Product.Sector] += float32(p.GetQty()) * float32(p.GetProduct().Sellingprice)
				totalWithProfit += float32(p.GetQty()) * float32(p.GetProduct().Sellingprice)
				total += float32(p.GetQty()) * float32(p.GetProduct().Buyingprice)
			}
		}

		sectorProfit := financial.MapToSectorSlice(sector)

		newPayoff := financial.Payoff{Sectors: sectorProfit, Timestamp: time.Now().Unix(), Toreceive: totalWithProfit, Profitless: total, Quoteid: quote.Id, Supplierid: sup.Id}

		err := store.Insert(newPayoff)
		if err != nil {
			logger.ErrorFunc(err)
			continue
		}
	}
}

func DeleteIncome(quote *quotes.Quote) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()

	store := db.GetStore(dataStore, "income")

	_, err := store.C.RemoveAll(bson.M{"quoteid": quote.Id})
	if err != nil {
		logger.ErrorFunc(err)
	}

}

func (s *Server) ToDestination(ctx context.Context, params *financial.Params) (*financial.Response, error) {

	// 	go func() {
	// 		dataStore := db.NewDataStore()

	// 		defer dataStore.Close()

	// 		store := db.GetStore(dataStore, "income")

	// 		var income financial.Income

	// 		err := store.GetElement(&income, bson.M{"name": params.Name})
	// 		if err != nil {
	// 			logger.ErrorFunc(err)
	// 			return
	// 		}

	// 		err = store.C.Update(bson.M{"name": params.Name}, bson.M{"name": params.Name, "payoffs": income.Payoffs, "sent": income.Sent + params.Amount})
	// 		if err != nil {
	// 			return
	// 		}
	// 	}()

	// 	go func() {
	// 		dataStore := db.NewDataStore()

	// 		defer dataStore.Close()
	// 		store := db.GetStore(dataStore, "banks")

	// 		var bank financial.Bank
	// 		query, _ := utils.GetQuery(`{"name":"` + params.To + `"}`)

	// 		err := store.GetElement(&bank, query)
	// 		if err != nil {
	// 			logger.ErrorFunc(err)
	// 			return
	// 		}

	// 		err = store.C.Update(bson.M{"name": bank.Name}, bson.M{"name": bank.Name, "money": bank.Money + params.Amount, "color": bank.Color})
	// 		if err != nil {
	// 			logger.ErrorFunc(err)
	// 			return
	// 		}

	// 	}()

	return new(financial.Response), nil

}

func (s *Server) NewBank(ctx context.Context, bank *financial.Bank) (*financial.EmptyResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "banks")

	err := store.Insert(bank)
	if err != nil {
		logger.ErrorFunc(err)
	}
	return new(financial.EmptyResponse), nil
}

func (s *Server) GetBanks(ctx context.Context, req *financial.Request) (*financial.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "banks")

	var banks []*financial.Bank
	err := store.GetAll(&banks, nil, nil)
	if err != nil {
		logger.ErrorFunc(err)
	}

	return &financial.Response{Banks: banks}, nil
}

func (s *Server) GetUnique(ctx context.Context, params *db.Params) (*db.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, params.Collection)

	var res []string
	err := store.GetUniqueFields(params.Field, &res)
	if err != nil {
		return new(db.Response), err
	}

	return &db.Response{Values: res}, nil
}

func GetDistance() {
	c, err := maps.NewClient(maps.WithAPIKey("AIzaSyDbT2dcYKnJTXxQymnL4LRpxM87cVkcEPw"))
	if err != nil {
		logger.ErrorFunc(err)
		return
	}

	d := maps.DistanceMatrixRequest{
		Origins: []string{
			"Urlovskaya 36, Kiev, Ukraine",
		},
		Destinations: []string{
			"Uritskogo 2, Lugansk, Ukraine",
		},
	}

	distance, err := c.DistanceMatrix(context.Background(), &d)
	if err != nil {
		logger.ErrorFunc(err)
		return
	}

	pretty.Println(distance)

}
