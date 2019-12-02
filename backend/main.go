package main

import (
	"context"
	"log"
	"net"

	"github.com/Beaxhem/manage/backend/pkg/authorization"
	"github.com/Beaxhem/manage/backend/pkg/db"
	"github.com/Beaxhem/manage/backend/pkg/financial"
	"github.com/Beaxhem/manage/backend/pkg/landing"
	"github.com/Beaxhem/manage/backend/pkg/products"
	"github.com/Beaxhem/manage/backend/pkg/quotes"
	"github.com/Beaxhem/manage/backend/pkg/services"

	"github.com/Beaxhem/manage/backend/internal/server"
	"github.com/jasonlvhit/gocron"
	"google.golang.org/grpc"
)

func serverInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {

	resp, err := handler(ctx, req)

	return resp, err
}

func withServerUnaryInterceptor() grpc.ServerOption {
	return grpc.UnaryInterceptor(serverInterceptor)
}

func main() {
	db.CreateSession()
	log.Println("Db connection created")
	listener, err := net.Listen("tcp", ":14586")
	if err != nil {
		panic(err)
	}

	gocron.Every(1).Hour().Do(server.RepeatedExpenses)

	srv := grpc.NewServer(withServerUnaryInterceptor())
	quotes.RegisterQuoteServiceServer(srv, &server.Server{})
	authorization.RegisterAuthorizationServiceServer(srv, &server.Server{})
	products.RegisterProductServiceServer(srv, &server.Server{})
	services.RegisterServicesServer(srv, &server.Server{})
	financial.RegisterFinancialServiceServer(srv, &server.Server{})
	landing.RegisterLandingServiceServer(srv, &server.Server{})

	db.RegisterDbServiceServer(srv, &server.Server{})
	if e := srv.Serve(listener); e != nil {
		panic(e)
	}
}
