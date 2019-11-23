package db

import (
	"log"
	"time"

	"gopkg.in/mgo.v2"
)

var session *mgo.Session

//CreateSession create a new db session
func CreateSession() {
	var err error
	session, err = mgo.DialWithInfo(&mgo.DialInfo{
		Addrs:   []string{"127.0.0.1"},
		Timeout: 60 * time.Second,
	})
	if err != nil {
		log.Fatalf("Failed to create DB session: %s\n", err)
	}
	// Index
	index := mgo.Index{
		Key:        []string{"$text:name"},
		Unique:     false,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
	c := session.DB("management").C("products")
	session.SetMode(mgo.Monotonic, true)

	err = c.EnsureIndex(index)
	if err != nil {
		panic(err)
	}
	c = session.DB("management").C("services")
	session.SetMode(mgo.Monotonic, true)

	err = c.EnsureIndex(index)
	if err != nil {
		panic(err)
	}

}

//getSession return a pointer to session
func getSession() *mgo.Session {
	if session == nil {
		var err error
		session, err = mgo.DialWithInfo(&mgo.DialInfo{
			Addrs:   []string{"127.0.0.1"},
			Timeout: 60 * time.Second,
		})
		if err != nil {
			log.Fatalf("Failed to get session: %s\n", err)
		}
	}
	return session
}

//DataStore struct
type DataStore struct {
	MongoSession *mgo.Session
}

//Close ends the connection
func (ds *DataStore) Close() {
	ds.MongoSession.Close()
}

//Collection sets collection for session
func (ds *DataStore) Collection(name string) *mgo.Collection {
	return ds.MongoSession.DB("management").C(name)
}

//NewDataStore return a data store
func NewDataStore() *DataStore {
	session := getSession().Copy()
	dataStore := &DataStore{
		MongoSession: session,
	}
	return dataStore
}

//Store struct
type Store struct {
	C *mgo.Collection
}

//GetStore returns new store
func GetStore(dataStore *DataStore, collection string) Store {

	col := dataStore.Collection(collection)
	store := Store{C: col}

	return store
}
