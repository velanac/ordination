package service

import (
	"context"

	"github.com/velenac/ordination/internal/store"
)

type HealthService struct {
	store store.UtilsRepository
}

func NewHealthService(store store.UtilsRepository) *HealthService {
	return &HealthService{store: store}
}

func (s *HealthService) HealthCheck(c context.Context) error {
	return s.store.Ping(c)
}
