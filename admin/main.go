package main

import (
	"log"
	"time"

	"github.com/Beaxhem/manage/backend/pkg/authorization"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
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

}

func main() {
	CreateSession()

	admin := authorization.User{FirstName: "Admin", Role: "admin", Username: "admin"}

	id, err := uuid.NewRandom()
	if err != nil {
		log.Println(err)
		return
	}
	admin.ID = id.String()

	hpass, err := bcrypt.GenerateFromPassword([]byte("admin"), bcrypt.DefaultCost)
	if err != nil {
		log.Println(err)
		return
	}

	admin.Password = string(hpass)

	session.DB("management").C("users").Insert(admin)

	log.Println("Admin account was successfully created!")
}
