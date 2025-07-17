package db

import (
	"context"
	"database/sql"
	"log"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/velenac/ordiora/internal/migrations"
)

func New(addr string, catalog string, maxOpenConns, maxIdleConns int, maxIdleTime string, appEnv string) (*sql.DB, error) {
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

	db, err := sql.Open("pgx", addr+catalog+"?sslmode=disable")
	if err != nil {
		return nil, err
	}

	db.SetMaxOpenConns(maxOpenConns)

	idleTime, err := time.ParseDuration(maxIdleTime)
	if err != nil {
		return nil, err
	}

	db.SetConnMaxIdleTime(idleTime)
	db.SetMaxIdleConns(maxIdleConns)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		return nil, err
	}

	return db, nil
}
