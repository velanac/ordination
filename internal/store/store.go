package store

import (
	"database/sql"
	"errors"
	"time"
)

var (
	ErrNotFound          = errors.New("resource not found")
	ErrConflict          = errors.New("resource conflict")
	QueryTimeoutDuration = time.Second * 5 // 5 minutes
)

type Storage struct {
	db    *sql.DB
	Utils UtilsRepository
	Users UsersRepository
	Auth  AuthRepository
}

func New(db *sql.DB) *Storage {
	return &Storage{
		db:    db,
		Utils: NewUtilsRepository(db),
		Users: NewUsersRepository(db),
		Auth:  NewAuthRepository(db),
	}
}
