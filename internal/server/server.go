package server

import (
	"net/http"
	"time"
)

type Server struct {
	port int
	db   any
}

func NewServer() *http.Server {
	NewServer := &Server{
		port: 8080,
		db:   nil,
	}

	server := &http.Server{
		Addr:         ":8080",
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	return server
}
