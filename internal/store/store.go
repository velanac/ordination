package store

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	ErrNotFound          = errors.New("resource not found")
	ErrConflict          = errors.New("resource conflict")
	QueryTimeoutDuration = time.Second * 5 // 5 minutes
)

var (
	DoctorEvent  = "doctor"
	PatientEvent = "patient"
	DoctorRole   = "Doctor"
	PatientRole  = "Patient"
	AdminRole    = "Admin"
)

type Querier interface {
	Exec(ctx context.Context, sql string, arguments ...any) (pgconn.CommandTag, error)
	Query(ctx context.Context, sql string, args ...any) (pgx.Rows, error)
	QueryRow(ctx context.Context, sql string, args ...any) pgx.Row
}

var _ Querier = (*pgxpool.Pool)(nil)
var _ Querier = (pgx.Tx)(nil)

type Store struct {
	db *pgxpool.Pool
}

func New(db *pgxpool.Pool) *Store {
	return &Store{
		db: db,
	}
}

func (s *Store) DB() *pgxpool.Pool {
	return s.db
}

func (s *Store) Q() Querier {
	return s.db
}

func (s *Store) WithTx(ctx context.Context, fn func(Querier) error) error {
	tx, err := s.db.Begin(ctx)
	if err != nil {
		return err
	}

	defer func() {
		if p := recover(); p != nil {
			_ = tx.Rollback(ctx)
			panic(p)
		}
	}()

	if err := fn(tx); err != nil {
		_ = tx.Rollback(ctx)
		return err
	}

	return tx.Commit(ctx)
}
