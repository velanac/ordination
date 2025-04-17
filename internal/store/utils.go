package store

import (
	"context"
)

type UtilsRepository struct {
	store *Store
}

func NewUtilsRepository(store *Store) *UtilsRepository {
	return &UtilsRepository{store: store}
}

func (s *UtilsRepository) Ping(c context.Context) error {
	ctx, cancel := context.WithTimeout(c, QueryTimeoutDuration)
	defer cancel()

	return s.store.DB().PingContext(ctx)
}
