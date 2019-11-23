package server

import (
	"context"

	"github.com/Beaxhem/manage/backend/internal/utils"
	"github.com/Beaxhem/manage/backend/pkg/db"
	"github.com/Beaxhem/manage/backend/pkg/logger"
	"github.com/Beaxhem/manage/backend/pkg/services"
)

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
