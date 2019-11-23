package server

import (
	"context"

	"github.com/Beaxhem/manage/backend/pkg/db"
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
