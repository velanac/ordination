package server

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/velenac/ordination/internal/config"
	"github.com/velenac/ordination/internal/store"
)

type Server struct {
	port   string
	store  *store.Store
	config *config.Config
}

func NewServer(cfg *config.Config, db *sql.DB) *http.Server {
	store := store.New(db)

	NewServer := &Server{
		port:   cfg.Addr,
		store:  store,
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
