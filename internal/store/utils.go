package store

import (
	"context"
	"database/sql"
)

type UtilsRepository interface {
	Ping(c context.Context) error
}

func NewUtilsRepository(db *sql.DB) UtilsRepository {
	return &utilsRepository{db: db}
}

type utilsRepository struct {
	db *sql.DB
}

func (s *utilsRepository) Ping(c context.Context) error {
	return s.db.Ping()
}
