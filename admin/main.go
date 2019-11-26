package main

import (
	"flag"
	"log"
	"time"

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

var firstname *string
var username *string
var password *string

func init() {
	firstname = flag.String("firstname", "Admin", "First name of the account")
	username = flag.String("username", "admin", "Username of the account")
	password = flag.String("password", "admin", "Password for the account")
}

func main() {
	CreateSession()

	flag.Parse()

	admin := struct {
		FirstName string
		Role      string
		Username  string
		Password  string
		ID        string
	}{FirstName: *firstname, Role: "admin", Username: *username}

	id, err := uuid.NewRandom()
	if err != nil {
		log.Println(err)
		return
	}
	admin.ID = id.String()

	hpass, err := bcrypt.GenerateFromPassword([]byte(*password), bcrypt.DefaultCost)
	if err != nil {
		log.Println(err)
		return
	}

	admin.Password = string(hpass)

	session.DB("management").C("users").Insert(admin)

	log.Println("Admin account was successfully created!")
}
