package server

import (
	"context"
	"time"

	"github.com/captain328/manage/backend/internal/utils"
	"github.com/captain328/manage/backend/pkg/db"
	"github.com/captain328/manage/backend/pkg/financial"
	"github.com/captain328/manage/backend/pkg/logger"
	"github.com/captain328/manage/backend/pkg/quotes"
	"github.com/google/uuid"

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

	go func(name string, amount float32) {
		dataStore := db.NewDataStore()

		defer dataStore.Close()
		store := db.GetStore(dataStore, "expenses")

		id, _ := uuid.NewRandom()
		err := store.Insert(financial.Expense{Id: id.String(), Timestamp: time.Now().Unix(), Name: name, Amount: amount})
		if err != nil {
			logger.ErrorFunc(err)

		}
	}(params.To, params.Amount)

	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "banks")

	var bank financial.Bank

	err := store.GetElement(&bank, bson.M{"name": params.To})
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.Response), err
	}

	bank.Money += params.Amount

	err = store.C.Update(bson.M{"name": bank.Name}, bank)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.Response), err
	}

	return new(financial.Response), nil

}
func NewExpense(ex *financial.Expense) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "expenses")

	err := store.Insert(ex)
	if err != nil {
		logger.ErrorFunc(err)
		return
	}
}

func (s *Server) NewExpense(ctx context.Context, expense *financial.Expense) (*financial.Expense, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "expenses")

	if expense.Id != "" {
		err := store.C.Update(bson.M{"id": expense.Id}, expense)
		if err != nil {
			logger.ErrorFunc(err)
			return new(financial.Expense), err
		}

		return new(financial.Expense), nil
	}
	id, _ := uuid.NewRandom()
	expense.Id = id.String()
	expense.Timestamp = time.Now().Unix()

	err := store.Insert(expense)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.Expense), err
	}

	return expense, nil
}

func (s *Server) GetExpense(ctx context.Context, params *financial.Params) (*financial.Expense, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "expenses")

	var exp financial.Expense

	err := store.GetElement(&exp, bson.M{"id": params.Id})
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.Expense), err
	}

	return &exp, nil
}

func (s *Server) GetExpenses(ctx context.Context, params *financial.Params) (*financial.Expenses, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "expenses")

	var exps []*financial.Expense
	var q interface{}
	var sortFields []string
	if params.GetQuery() != nil {
		q, _ = utils.GetQuery(params.GetQuery().Querystring)
		sortFields = params.GetQuery().SortFields
	}

	err := store.GetAll(&exps, sortFields, q)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.Expenses), err
	}

	return &financial.Expenses{Expense: exps}, nil
}

func (s *Server) Pay(ctx context.Context, params *financial.PaymentParams) (*financial.EmptyResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "income")

	var payoff financial.Payoff
	err := store.GetElement(&payoff, bson.M{"quoteid": params.Id})
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.EmptyResponse), err
	}

	if payoff.Toreceive-params.Amount < 0 {

		return new(financial.EmptyResponse), nil
	}

	payoff.Toreceive -= params.Amount
	payoff.Paid += params.Amount

	err = store.C.Update(bson.M{"quoteid": params.Id}, payoff)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.EmptyResponse), err
	}

	return new(financial.EmptyResponse), nil
}

func (s *Server) DeleteExpense(ctx context.Context, params *financial.Params) (*financial.EmptyResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "expenses")

	err := store.DeleteElementByID(params.Id)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.EmptyResponse), err
	}

	return new(financial.EmptyResponse), nil
}

func (s *Server) ToggleReiteration(ctx context.Context, params *financial.Params) (*financial.EmptyResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "expenses")

	var ex financial.Expense
	err := store.GetElementByID(params.Id, &ex)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.EmptyResponse), err
	}

	ex.Repeated = true

	err = store.C.Update(bson.M{"id": ex.Id}, ex)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.EmptyResponse), err
	}

	return new(financial.EmptyResponse), nil
}

func RepeatedExpenses() {

	if time.Now().Hour() != 0 {
		return
	}

	go func() {
		dataStore := db.NewDataStore()

		defer dataStore.Close()
		store := db.GetStore(dataStore, "salaries")

		var sls []*financial.Salary
		err := store.GetAll(&sls, nil, nil)
		if err != nil {
			logger.ErrorFunc(err)
			return
		}

		for _, r := range sls {
			if r.Period < time.Now().Unix() {
				r.Period = int64(time.Duration(r.Period) + 31*24*time.Hour)
				err := store.C.Update(bson.M{"name": r.Name}, r)
				if err != nil {
					logger.ErrorFunc(err)
					return
				}

				id, _ := uuid.NewRandom()

				NewExpense(&financial.Expense{Name: r.Name, Amount: r.Amount, Timestamp: time.Now().Unix(), Id: id.String()})
			}
		}
	}()

	go func() {
		dataStore := db.NewDataStore()

		defer dataStore.Close()
		expensesStore := db.GetStore(dataStore, "expenses")

		var exps []*financial.Expense
		err := expensesStore.GetAll(&exps, nil, bson.M{"type": "repeated"})
		if err != nil {
			logger.ErrorFunc(err)
			return
		}

		for _, r := range exps {
			if r.Period < time.Now().Unix() {
				r.Period = int64(time.Duration(r.Period) + time.Duration(r.Step)*24*time.Hour)
				err := expensesStore.C.Update(bson.M{"name": r.Name}, r)
				if err != nil {
					logger.ErrorFunc(err)
					return
				}
				id, _ := uuid.NewRandom()

				NewExpense(&financial.Expense{Name: r.Name, Amount: r.Amount, Timestamp: time.Now().Unix(), Id: id.String()})
			}
		}
	}()

}

func (s *Server) NewSalary(ctx context.Context, salary *financial.Salary) (*financial.Salary, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "salaries")

	if salary.Id != "" {
		err := store.C.Update(bson.M{"id": salary.Id}, salary)
		if err != nil {
			logger.ErrorFunc(err)
			return new(financial.Salary), err
		}

		return new(financial.Salary), nil
	}
	id, _ := uuid.NewRandom()
	salary.Id = id.String()
	salary.Timestamp = time.Now().Unix()

	err := store.Insert(salary)
	if err != nil {
		logger.ErrorFunc(err)
		return new(financial.Salary), err
	}

	return salary, nil
}
