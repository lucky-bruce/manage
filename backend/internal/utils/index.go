package utils

import (
	"encoding/json"

	"gopkg.in/mgo.v2/bson"
)

func GetQuery(querystring string) (interface{}, error) {
	query := make(bson.M)
	err := json.Unmarshal([]byte(querystring), &query)

	return query, err
}
