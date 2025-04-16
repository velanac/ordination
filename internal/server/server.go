package server

import (
	"net/http"
	"time"

	"github.com/velenac/ordination/internal/auth"
	"github.com/velenac/ordination/internal/store"
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
	port           string
	store          *store.Storage
	config         Config
	authentication *auth.JWTAuthenticator
}

func NewServer(cfg Config, store *store.Storage, auth *auth.JWTAuthenticator) *http.Server {
	NewServer := &Server{
		port:           cfg.Addr,
		store:          store,
		config:         cfg,
		authentication: auth,
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
