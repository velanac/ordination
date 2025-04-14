package store

import "database/sql"

type UtilsStorage struct {
	db *sql.DB
}

func (s *UtilsStorage) Ping() error {
	return s.db.Ping()
}
