package server

import (
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/velenac/ordiora/internal/store"
	"github.com/velenac/ordiora/pkg/config"
	"github.com/velenac/ordiora/pkg/filestore"
)

type Server struct {
	port   string
	store  *store.Store
	config *config.Config
	fs     *filestore.FileStore
}

func NewServer(cfg *config.Config, db *pgxpool.Pool, fs *filestore.FileStore) *http.Server {
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
