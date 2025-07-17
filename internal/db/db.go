package db

import (
	"context"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/velenac/ordiora/internal/migrations"
)

func New(addr string, catalog string, maxOpenConns, maxIdleConns int, maxIdleTime string, appEnv string) (*pgxpool.Pool, error) {
	if appEnv == "production" {
		log.Println("Running in production mode")
		migrator := migrations.New(
			addr,
			catalog,
		)
		err := migrator.CreateDatabaseIfNotExtist().RunMigrations()
		if err != nil {
			return nil, err
		}
	}

	// Kreiranje pgx konfiguracije
	config, err := pgxpool.ParseConfig(addr + catalog + "?sslmode=disable")
	if err != nil {
		return nil, err
	}

	// Podešavanje connection pool-a
	config.MaxConns = int32(maxOpenConns)
	config.MinConns = int32(maxIdleConns)

	idleTime, err := time.ParseDuration(maxIdleTime)
	if err != nil {
		return nil, err
	}
	config.MaxConnIdleTime = idleTime

	// Kreiranje connection pool-a
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	db, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return nil, err
	}

	// Test konekcije
	if err := db.Ping(ctx); err != nil {
		return nil, err
	}

	return db, nil
}
