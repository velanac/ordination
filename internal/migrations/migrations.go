package migrations

import (
	"database/sql"
	"embed"
	"fmt"
	"log"

	_ "github.com/lib/pq"
	"github.com/pressly/goose/v3"
)

//go:embed migrations/*.sql
var embedMigrations embed.FS

type Migrator struct {
	DbServer string
	Catalog  string
	db       *sql.DB
}

func New(dbServer, catalog string) *Migrator {
	return &Migrator{
		DbServer: dbServer,
		Catalog:  catalog,
	}
}

func (m *Migrator) CreateDatabaseIfNotExtist() *Migrator {
	db, err := sql.Open("postgres", m.DbServer+"postgres?sslmode=disable")
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	m.db = db

	var exists bool
	err = db.QueryRow(`
		SELECT EXISTS(
			SELECT 1 FROM pg_database WHERE datname = $1
		)`, m.Catalog).Scan(&exists)
	if err != nil {
		log.Fatalf("Failed to check database existence: %v", err)
	}

	if !exists {
		_, err = db.Exec(fmt.Sprintf("CREATE DATABASE %s\n", m.Catalog))
		if err != nil {
			log.Fatalf("Failed to create database: %v", err)
		}
		log.Printf("Database %s created\n", m.Catalog)
	} else {
		log.Printf("Database %s already exists\n", m.Catalog)
	}

	return m
}

func (m *Migrator) RunMigrations() error {
	goose.SetBaseFS(embedMigrations)

	if err := goose.SetDialect("postgres"); err != nil {
		return err
	}

	if err := goose.Up(m.db, "migrations"); err != nil {
		return err
	}

	log.Println("Migrations applied successfully")

	m.db.Close()

	return nil
}
