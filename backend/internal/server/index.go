package server

import (
	"context"

	"googlemaps.github.io/maps"

	"github.com/kr/pretty"

	"github.com/Beaxhem/manage/backend/internal/logger"

	"github.com/Beaxhem/manage/backend/internal/db"
)

type Server struct{}

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
