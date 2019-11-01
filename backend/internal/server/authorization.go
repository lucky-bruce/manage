package server

import (
	"context"

	"github.com/Beaxhem/manage/backend/internal/authorization"
	"github.com/Beaxhem/manage/backend/internal/db"
	"github.com/Beaxhem/manage/backend/internal/logger"
	"github.com/Beaxhem/manage/backend/internal/quotes"
	"github.com/Beaxhem/manage/backend/internal/utils"
	"gopkg.in/mgo.v2/bson"
)

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
			continue
		}
		if quote.Status == quotes.Status_COMPLETED {
			statts.Completed++
		}

	}

	return &statts, nil
}
