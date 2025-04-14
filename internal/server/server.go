package server

import (
	"database/sql"
	"net/http"
	"time"
)

type DbConfig struct {
	DbServer     string
	Catalog      string
	MaxOpenConns int
	MaxIdleConns int
	MaxIdleTime  string
}

type Config struct {
	Addr        string
	DB          DbConfig
	AppEnv      string
	FrontendURL string
}

type Server struct {
	port   string
	db     *sql.DB
	config Config
}

func NewServer(cfg Config, db *sql.DB) *http.Server {
	NewServer := &Server{
		port:   cfg.Addr,
		db:     db,
		config: cfg,
	}

	server := &http.Server{
		Addr:         NewServer.port,
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	return server
}
