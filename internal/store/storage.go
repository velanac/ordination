package store

import (
	"context"
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
	UtilsStorage interface {
		Ping() error
	}
	UsersStorage interface {
		IsSuperAdminOpen(c context.Context) (bool, error)
		OpenSuperAdmin(c context.Context, user *User) error
	}
}

func New(db *sql.DB) *Storage {
	return &Storage{
		UtilsStorage: &UtilsStorage{db: db},
		UsersStorage: &UserStorage{db: db},
	}
}
