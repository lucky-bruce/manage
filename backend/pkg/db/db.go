package db

import (
	"strconv"

	"github.com/captain328/manage/backend/pkg/authorization"
	"github.com/captain328/manage/backend/pkg/landing"
	"github.com/captain328/manage/backend/pkg/logger"
	"github.com/captain328/manage/backend/pkg/products"
	"github.com/captain328/manage/backend/pkg/quotes"
	"github.com/captain328/manage/backend/pkg/services"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

func (store Store) Insert(item interface{}) error {

	err := store.C.Insert(item)

	return err
}

func (store Store) GetAll(result interface{}, sort []string, query interface{}) error {

	err := store.C.Find(query).Sort(sort...).All(result)

	return err
}

func (store Store) GetElementByID(id string, result interface{}) error {

	err := store.C.Find(bson.M{"id": id}).One(result)

	return err
}

func (store Store) GetUniqueFields(field string, res interface{}) error {

	err := store.C.Find(nil).Distinct(field, res)
	if err != nil {
		logger.ErrorFunc(err)
		return err
	}

	return nil
}

func (store Store) DeleteElementByID(id string) error {

	err := store.C.Remove(bson.M{"id": id})
	if err != nil {
		logger.ErrorFunc(err)
	}

	return err
}

func (store Store) EditByID(id string, item map[string]interface{}) error {

	err := store.C.Update(bson.M{"id": id}, item)
	if err != nil {
		logger.ErrorFunc(err)
	}
	return err
}

func (store Store) Register(user *authorization.User) (*authorization.Response, error) {
	hpass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		logger.ErrorFunc(err)
		return &authorization.Response{}, nil
	}
	if user.Role == "" {
		user.Role = "user"
	}

	id, err := uuid.NewRandom()
	if err != nil {

		logger.ErrorFunc(err)

		return &authorization.Response{}, err
	}
	user.ID = id.String()

	user.Password = string(hpass)

	err = store.C.Insert(user)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}
	token, err := authorization.GenerateJWT(user)
	if err != nil {
		logger.ErrorFunc(err)
		return new(authorization.Response), err
	}
	return &authorization.Response{Token: token}, nil
}

func (store Store) Login(logParams *authorization.LoginParams) (*authorization.Response, error) {
	var user authorization.User
	err := store.C.Find(bson.M{"email": logParams.Email}).One(&user)
	if err != nil {
		err = store.C.Find(bson.M{"username": logParams.Email}).One(&user)
		if err != nil {
			logger.ErrorFunc(err)
			return new(authorization.Response), err
		}

	}

	// Validate password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(logParams.Password))
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

func (store Store) GetLastItem(item interface{}) error {

	err := store.C.Find(nil).Sort("-_id").Limit(1).One(item)
	if err != nil {
		logger.ErrorFunc(err)
	}
	return err
}

func IdGenerator(item interface{}) error {
	dataStore := NewDataStore()

	defer dataStore.Close()

	switch item.(type) {
	case *quotes.Quote:

		store := GetStore(dataStore, "quotes")

		var lastQuote quotes.Quote
		err := store.GetLastItem(&lastQuote)
		if err != nil {

			item.(*quotes.Quote).Id = "0000001Q"
			return nil
		}
		prevID := lastQuote.GetId()

		num, err := NewID(prevID)
		if err != nil {
			logger.ErrorFunc(err)
			return err
		}
		newID := num + "Q"

		item.(*quotes.Quote).Id = newID

		return nil
	case *products.Product:
		store := GetStore(dataStore, "products")

		var lastProduct products.Product
		err := store.GetLastItem(&lastProduct)

		if err != nil {

			item.(*products.Product).Id = "0000001P"
			return nil
		}
		prevID := lastProduct.GetId()
		num, err := NewID(prevID)
		if err != nil {
			logger.ErrorFunc(err)
			return err
		}
		newID := num + "P"

		item.(*products.Product).Id = newID
		return nil
	case *services.Service:

		store := GetStore(dataStore, "services")

		var lastProduct services.Service
		err := store.GetLastItem(&lastProduct)

		if err != nil {

			item.(*services.Service).Id = "0000001S"
			return nil
		}
		prevID := lastProduct.GetId()
		num, err := NewID(prevID)
		if err != nil {
			logger.ErrorFunc(err)
			return err
		}
		newID := num + "P"

		item.(*services.Service).Id = newID
		return nil
	case *landing.Portfolio:
		store := GetStore(dataStore, "portfolios")

		var lastProduct landing.Portfolio
		err := store.GetLastItem(&lastProduct)

		if err != nil {

			item.(*landing.Portfolio).Id = "0000001F"
			return nil
		}
		prevID := lastProduct.GetId()
		num, err := NewID(prevID)
		if err != nil {
			logger.ErrorFunc(err)
			return err
		}
		newID := num + "F"

		item.(*landing.Portfolio).Id = newID
		return nil

	}

	logger.ErrorFunc("Something went wrong")
	return nil

}

func NewID(prevID string) (string, error) {
	prevStrID := prevID[:len(prevID)-1]
	numID, err := strconv.Atoi(prevStrID)
	if err != nil {
		logger.ErrorFunc(err)
		return "", err
	}
	newID := numID + 1
	var offset string
	for i := 0; i < 7-len(strconv.Itoa(newID)); i++ {
		offset += "0"
	}

	new := offset + strconv.Itoa(newID)
	return new, nil
}

func (store Store) GetElement(result interface{}, query interface{}) error {
	err := store.C.Find(query).One(result)

	return err
}
