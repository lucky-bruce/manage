package server

import (
	"context"

	"github.com/captain328/manage/backend/pkg/db"
	"github.com/captain328/manage/backend/pkg/landing"
	"github.com/captain328/manage/backend/pkg/logger"
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

func (s *Server) NewMix(ctx context.Context, mix *landing.Mix) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "mix")

	var item landing.Mix
	err := store.GetElement(&item, bson.M{"title": mix.Title})
	if err != nil {
		err := store.Insert(mix)
		if err != nil {
			logger.ErrorFunc(err)
			return new(landing.Response), err
		}
	} else {
		err := store.C.Update(bson.M{"title": mix.Title}, mix)
		if err != nil {
			logger.ErrorFunc(err)
			return new(landing.Response), err
		}
	}

	return new(landing.Response), err
}

func (s *Server) GetMixes(ctx context.Context, params *landing.Params) (*landing.Mixes, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "mix")

	var mixes []*landing.Mix
	err := store.GetAll(&mixes, nil, nil)
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Mixes), err
	}

	return &landing.Mixes{Mixes: mixes}, nil
}

func (s *Server) DeleteMix(ctx context.Context, params *landing.Params) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "mix")

	err := store.C.Remove(bson.M{"title": params.Name})
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Response), err
	}

	return new(landing.Response), nil
}

func (s *Server) NewBasic(ctx context.Context, basic *landing.Basic) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "basic")

	_, _ = store.C.RemoveAll(nil)
	err := store.Insert(basic)
	if err != nil {
		logger.ErrorFunc(err)

	}

	return new(landing.Response), err
}

func (s *Server) GetBasic(ctx context.Context, params *landing.Params) (*landing.Basic, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "basic")

	var basic landing.Basic
	err := store.GetElement(&basic, nil)
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Basic), err
	}

	return &basic, nil
}

func (s *Server) NewSector(ctx context.Context, sector *landing.Sector) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "sectors")

	logger.InfoFunc(sector)
	var item landing.Sector
	err := store.GetElement(&item, bson.M{"title": sector.Title})
	if err != nil {
		err := store.Insert(sector)
		if err != nil {
			logger.ErrorFunc(err)

		}
	} else {
		err := store.C.Update(bson.M{"title": sector.Title}, sector)
		if err != nil {
			logger.ErrorFunc(err)

		}
	}

	return new(landing.Response), nil
}

func (s *Server) GetSectors(ctx context.Context, params *landing.Params) (*landing.Sectors, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "sectors")

	var sectors []*landing.Sector
	err := store.GetAll(&sectors, nil, nil)
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Sectors), err
	}

	return &landing.Sectors{Sectors: sectors}, nil
}

func (s *Server) DeleteSector(ctx context.Context, params *landing.Params) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "sectors")

	err := store.C.Remove(bson.M{"title": params.Name})
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Response), err
	}

	return new(landing.Response), nil
}

func (s *Server) NewNews(ctx context.Context, news *landing.News) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "news")

	err := store.Insert(news)
	if err != nil {
		logger.ErrorFunc(err)

	}

	return new(landing.Response), err
}

func (s *Server) GetNews(ctx context.Context, params *landing.Params) (*landing.NewsList, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "news")

	var news []*landing.News
	err := store.GetAll(&news, nil, nil)
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.NewsList), err
	}

	return &landing.NewsList{News: news}, nil
}

func (s *Server) DeleteNews(ctx context.Context, params *landing.Params) (*landing.Response, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "news")

	err := store.C.Remove(bson.M{"title": params.Name})
	if err != nil {
		logger.ErrorFunc(err)
		return new(landing.Response), err
	}

	return new(landing.Response), nil
}
