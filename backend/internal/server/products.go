package server

import (
	"bytes"
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
	"path/filepath"
	"strings"
	"time"

	"github.com/Beaxhem/manage/backend/internal/chunker"
	"github.com/Beaxhem/manage/backend/internal/db"
	"github.com/Beaxhem/manage/backend/internal/logger"
	"github.com/Beaxhem/manage/backend/internal/products"
	"github.com/Beaxhem/manage/backend/internal/utils"
	"github.com/chai2010/webp"
)

const chunkSize = 64 * 1024 // 64 KiB

func (s *Server) NewProduct(ctx context.Context, product *products.Product) (*products.Product, error) {
	dataStore := db.NewDataStore()

	defer dataStore.Close()
	store := db.GetStore(dataStore, "products")

	err := db.IdGenerator(product)

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

func (s *Server) Chunker(req *chunker.Request, srv chunker.Chunker_ChunkerServer) error {
	path, err := filepath.Abs(req.Url)

	file, err := os.Open(path)

	if err != nil {
		logger.ErrorFunc(err)
		return err
	}

	img, _, err := image.Decode(file)

	buf := new(bytes.Buffer)
	err = webp.Encode(buf, img, nil)
	if err != nil {
		logger.ErrorFunc(err)
		return err
	}

	c := buf.Bytes()
	chnk := &chunker.Chunk{}

	for currentByte := 0; currentByte < len(c); currentByte += chunkSize {
		if currentByte+chunkSize > len(c) {
			chnk.Chunk = c[currentByte:len(c)]
		} else {
			chnk.Chunk = c[currentByte : currentByte+chunkSize]
		}
		if err := srv.Send(chnk); err != nil {
			return err
		}
	}

	return nil
}

func (s *Server) UploadImage(ctx context.Context, img *products.Image) (*products.ImageResponse, error) {
	fp := fmt.Sprintf("images/%d/%d/%d", time.Now().Year(), time.Now().Month(), time.Now().Day())

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

	dst, err := os.Create(path + "/" + fmt.Sprintf("%d.webp", time.Now().Unix()))
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
