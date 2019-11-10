package server

import (
	"context"

	"github.com/Beaxhem/manage/backend/internal/db"
	"github.com/Beaxhem/manage/backend/internal/landing"
	"github.com/Beaxhem/manage/backend/internal/logger"
	"gopkg.in/mgo.v2/bson"
)

func (s *Server) NewTeam(ctx context.Context, team *landing.Team) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "teams")

	err := store.Insert(team)
	if err != nil {
		logger.ErrorFunc(err)
	}
	return new(landing.Response), err
}

func (s *Server) GetTeams(ctx context.Context, params *landing.Params) (*landing.Teams, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "teams")

	var teams []*landing.Team

	err := store.GetAll(&teams, nil, nil)
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Teams), err
	}

	return &landing.Teams{Teams: teams}, nil
}

func (s *Server) DeleteTeam(ctx context.Context, params *landing.Params) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "teams")

	err := store.C.Remove(bson.M{"name": params.Name})
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Response), err
	}

	return new(landing.Response), nil

}

func (s *Server) NewPortfolio(ctx context.Context, portfolio *landing.Portfolio) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "portfolios")

	err := db.IdGenerator(portfolio)
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Response), err
	}

	err = store.Insert(portfolio)
	if err != nil {
		logger.ErrorFunc(err)
	}
	return new(landing.Response), err
}

func (s *Server) GetPortfolios(ctx context.Context, params *landing.Params) (*landing.Portfolios, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "portfolios")

	var portfolios []*landing.Portfolio
	err := store.GetAll(&portfolios, nil, nil)
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Portfolios), err
	}

	return &landing.Portfolios{Portfolios: portfolios}, nil
}

func (s *Server) DeletePortfolio(ctx context.Context, params *landing.Params) (*landing.Response, error) {

	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "portfolios")

	err := store.C.Remove(bson.M{"id": params.Id})
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Response), err
	}

	return new(landing.Response), nil
}
