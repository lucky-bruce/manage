package server

import (
	"context"

	"github.com/Beaxhem/manage/backend/internal/utils"
	"github.com/Beaxhem/manage/backend/pkg/authorization"
	"github.com/Beaxhem/manage/backend/pkg/db"
	"github.com/Beaxhem/manage/backend/pkg/logger"
	"github.com/Beaxhem/manage/backend/pkg/quotes"
	"golang.org/x/crypto/bcrypt"
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

func (s *Server) ChangePassword(ctx context.Context, params *authorization.PasswordChange) (*authorization.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "users")

	var user authorization.User

	err := store.GetElement(&user, bson.M{"id": params.Id})
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(params.Old))
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	hpass, err := bcrypt.GenerateFromPassword([]byte(params.New), bcrypt.DefaultCost)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	user.Password = string(hpass)

	err = store.C.Update(bson.M{"id": params.Id}, user)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	return new(authorization.Response), nil
}

func (s *Server) ChangePermissions(ctx context.Context, params *authorization.PermissionParams) (*authorization.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "users")

	var user authorization.User
	err := store.GetElementByID(params.Id, &user)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	user.Permission = params.Permission

	err = store.C.Update(bson.M{"id": params.Id}, user)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	token, err := authorization.GenerateJWT(&user)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}
	return &authorization.Response{Token: token}, nil
}

func (s *Server) LinkSalary(ctx context.Context, params *authorization.Params) (*authorization.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "users")

	var user authorization.User
	logger.InfoFunc(params.Salaryid)
	err := store.GetElement(&user, bson.M{"id": params.Id})
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	user.Salaryid = params.Salaryid

	err = store.C.Update(bson.M{"id": params.Id}, user)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}

	return new(authorization.Response), nil
}
