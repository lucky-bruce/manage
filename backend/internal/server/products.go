package server

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"os"
	"strings"
	"time"

	"github.com/Beaxhem/manage/backend/internal/utils"
	"github.com/Beaxhem/manage/backend/pkg/db"
	"github.com/Beaxhem/manage/backend/pkg/logger"
	"github.com/Beaxhem/manage/backend/pkg/products"
	"github.com/chai2010/webp"
	"gopkg.in/mgo.v2/bson"
)

const chunkSize = 16 * 1024 // 16 KiB

func (s *Server) NewProduct(ctx context.Context, product *products.Product) (*products.Product, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	err := db.IdGenerator(product)

	product.Addedtime = time.Now().Unix()
	product.Sellingprice = product.Buyingprice + (product.Desiredprofit*product.Buyingprice)/100

	err = store.Insert(product)
	return product, err
}

func (s *Server) GetProducts(ctx context.Context, productParams *products.ProductParams) (*products.ProductResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")
	q := productParams.GetQuery()
	query, _ := utils.GetQuery(q.GetQuerystring())

	var p []*products.Product

	err := store.GetAll(&p, nil, query)

	return &products.ProductResponse{Products: p}, err
}

func (s *Server) GetProductByID(ctx context.Context, productParams *products.ProductParams) (*products.Product, error) {
	id := productParams.GetId()

	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	var p products.Product

	err := store.GetElementByID(id, &p)

	return &p, err

}

func (s *Server) EditProduct(ctx context.Context, product *products.Product) (*products.EmptyResponse, error) {
	m := make(map[string]interface{})
	b, err := json.Marshal(product)
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.EmptyResponse), err
	}

	err = json.Unmarshal(b, &m)
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.EmptyResponse), err
	}

	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	err = store.EditByID(product.GetId(), m)

	return new(products.EmptyResponse), err
}

func (s *Server) DeleteProductByID(ctx context.Context, productParams *products.ProductParams) (*products.EmptyResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	var product products.Product
	err := store.GetElementByID(productParams.Id, product)
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.EmptyResponse), err
	}
	go DeleteFiles(product)

	err = store.DeleteElementByID(productParams.GetId())

	return new(products.EmptyResponse), err
}

func DeleteFiles(product products.Product) {
	for _, v := range product.Images {
		err := os.Remove(v)
		if err != nil {
			logger.ErrorFunc(err)
			return
		}
	}
}

func (s *Server) UploadImage(ctx context.Context, img *products.Image) (*products.ImageResponse, error) {
	t := time.Now()
	fp := fmt.Sprintf("images/%d/%d/%d", t.Year(), t.Month(), t.Day())

	dst, err := NewImageFromString(img.Image, img.Ext, fp)
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.ImageResponse), err
	}

	return &products.ImageResponse{Url: dst.Name()}, nil

}

func NewImageFromString(img, ext, path string) (*os.File, error) {
	i := strings.Index(img, ",")
	if i < 0 {
		logger.ErrorFunc("Bad image data")
		return nil, errors.New("Bad image data")
	}

	dec := base64.NewDecoder(base64.StdEncoding, strings.NewReader(img[i+1:]))

	err := os.MkdirAll(path, 0777)
	if err != nil {
		logger.ErrorFunc("os.MkdirAll(path, 0777) error:", err)
		return nil, err
	}

	var decImg image.Image
	if ext == ".png" {
		decImg, err = png.Decode(dec)
	} else if ext == ".jpeg" {
		decImg, err = jpeg.Decode(dec)
	} else if ext == ".gif" {
		decImg, err = gif.Decode(dec)
	} else {
		decImg, _, err = image.Decode(dec)
	}

	if err != nil {
		logger.ErrorFunc("image.Decode(src) error:", err)
		return nil, err
	}

	dst, err := os.Create(path + fmt.Sprintf("/%d.webp", time.Now().Unix()))
	if err != nil {
		logger.ErrorFunc("os.Create(src) error:", err)
		return nil, err
	}
	defer dst.Close()
	err = webp.Encode(dst, decImg, &webp.Options{Quality: 80})

	if err != nil {
		logger.ErrorFunc("webp.Encode(src) error:", err)
		return nil, err
	}

	return dst, nil
}

func (s *Server) NewComment(c context.Context, comment *products.Comment) (*products.EmptyResponse, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "comments")

	err := store.Insert(comment)
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.EmptyResponse), err
	}

	return new(products.EmptyResponse), nil
}

func (*Server) GetComments(c context.Context, params *products.ProductParams) (*products.Comments, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "comments")

	var comments []*products.Comment
	err := store.GetAll(&comments, nil, bson.M{"id": params.Id})
	if err != nil {
		logger.ErrorFunc(err)
		return new(products.Comments), err
	}

	return &products.Comments{Comments: comments}, nil
}
