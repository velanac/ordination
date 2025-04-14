package store

import "database/sql"

type Storage struct {
	UtilsStorage interface {
		Ping() error
	}
}

func New(db *sql.DB) *Storage {
	return &Storage{
		UtilsStorage: &UtilsStorage{db: db},
	}
}
