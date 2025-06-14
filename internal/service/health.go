package service

import (
	"context"

	"github.com/velenac/ordiora/internal/store"
)

type HealthService struct {
	utils *store.UtilsRepository
}

func NewHealthService(s *store.Store) *HealthService {
	return &HealthService{utils: store.NewUtilsRepository(s)}
}

func (s *HealthService) HealthCheck(c context.Context) error {
	return s.utils.Ping(c)
}
