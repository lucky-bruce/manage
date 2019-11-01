package server

import (
	"context"
	"time"

	"github.com/Beaxhem/manage/backend/internal/db"
	"github.com/Beaxhem/manage/backend/internal/financial"
	"github.com/Beaxhem/manage/backend/internal/logger"
	"github.com/Beaxhem/manage/backend/internal/quotes"
	"github.com/Beaxhem/manage/backend/internal/utils"
	"gopkg.in/mgo.v2/bson"
)

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
