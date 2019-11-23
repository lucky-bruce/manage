package authorization

import (
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var mySigningKey = []byte("captainjacksparrowsayshi")

//GenerateJWT creates new JWT token
func GenerateJWT(client *User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = client.GetID()
	claims["authorized"] = true
	claims["firstName"] = client.FirstName
	claims["lastName"] = client.LastName
	claims["role"] = client.Role
	claims["state"] = client.State
	claims["city"] = client.City
	claims["address"] = client.Address
	claims["email"] = client.Email
	claims["phonenumber"] = client.PhoneNumber
	claims["companyname"] = client.CompanyName
	claims["companyid"] = client.Companyid
	claims["permission"] = client.Permission
	claims["exp"] = time.Now().Add(time.Hour * 3).Unix()

	tokenString, err := token.SignedString(mySigningKey)

	if err != nil {
		log.Printf("Something Went Wrong: %s", err.Error())
		return "", err
	}

	return tokenString, nil
}

//ValidateJWT check if provided token is valid
func ValidateJWT(JWTToken string) (interface{}, error) {
	if len(JWTToken) < 2 {
		return nil, errors.New("Invalid authorization token")
	}
	token, _ := jwt.Parse(JWTToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("There was an error")
		}
		return mySigningKey, nil
	})

	if token.Valid {
		claims := token.Claims
		return claims, nil
	}

	return nil, errors.New("Invalid authorization token")
}

//JWTMiddleware checks if the Authorizations header is provided
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		if c.Request.Header["Authorization"] != nil {
			log.Println(c.Request.Header["Authorization"])
			token, err := jwt.Parse(strings.Split(c.Request.Header["Authorization"][0], " ")[1], func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("There was an error")
				}
				return mySigningKey, nil
			})
			if err != nil {
				c.AbortWithStatusJSON(401, "You are unauthorized!")
				return
			}

			if token.Valid {
				c.Next()
			}
		} else {
			c.AbortWithStatusJSON(401, "No token")
			return
		}
	}
}
