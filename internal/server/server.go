package server

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/velenac/ordination/internal/store"
	"github.com/velenac/ordination/pkg/config"
	"github.com/velenac/ordination/pkg/filestore"
)

type Server struct {
	port   string
	store  *store.Store
	config *config.Config
	fs     *filestore.FileStore
}

func NewServer(cfg *config.Config, db *sql.DB, fs *filestore.FileStore) *http.Server {
	store := store.New(db)

	NewServer := &Server{
		port:   cfg.Addr,
		store:  store,
		config: cfg,
		fs:     fs,
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
