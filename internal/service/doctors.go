package service

import (
	"context"

	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/store"
)

type DoctorsService struct {
	s       *store.Store
	doctors *store.DoctorsRepository
}

func NewDoctorsService(s *store.Store) *DoctorsService {
	return &DoctorsService{
		s:       s,
		doctors: store.NewDoctorsRepository(),
	}
}

// GetList retrieves a list of doctors.
func (s *DoctorsService) GetList(c context.Context) ([]*models.Doctor, error) {
	doctors, err := s.doctors.GetList(c, s.s.Q())
	if err != nil {
		return nil, err
	}

	return doctors, nil
}
