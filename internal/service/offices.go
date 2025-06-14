package service

import (
	"context"

	"github.com/velenac/ordiora/internal/models"
	"github.com/velenac/ordiora/internal/store"
)

type OfficeService struct {
	store   *store.Store
	offices *store.OfficesRepository
}

func NewOfficeService(s *store.Store) *OfficeService {
	return &OfficeService{
		store:   s,
		offices: store.NewOfficesRepository(),
	}
}

func (s *OfficeService) GetList(c context.Context) ([]*models.Office, error) {
	offices, err := s.offices.GetList(c, s.store.Q())
	if err != nil {
		return nil, err
	}

	return offices, nil
}

func (s *OfficeService) GetById(c context.Context, id string) (*models.Office, error) {
	office, err := s.offices.GetByID(c, s.store.Q(), id)
	if err != nil {
		return nil, err
	}

	return office, nil
}

func (s *OfficeService) Create(c context.Context, payload *models.OfficePayload) error {
	office := &models.Office{
		Name:        payload.Name,
		Description: payload.Description,
	}

	if err := s.offices.Create(c, s.store.Q(), office); err != nil {
		return err
	}

	return nil
}

func (s *OfficeService) Update(c context.Context, id string, payload *models.OfficePayload) error {
	office := &models.Office{
		ID:          id,
		Name:        payload.Name,
		Description: payload.Description,
	}

	// Check if the office exists
	exist, err := s.offices.IsExists(c, s.store.Q(), id)
	if err != nil {
		return err
	}

	if !exist {
		return ErrNotFound
	}

	if err := s.offices.Update(c, s.store.Q(), id, office); err != nil {
		return err
	}

	return nil
}

func (s *OfficeService) Delete(c context.Context, id string) error {
	// Check if the office exists
	exist, err := s.offices.IsExists(c, s.store.Q(), id)
	if err != nil {
		return err
	}

	if !exist {
		return ErrNotFound
	}

	// Delete the office
	if err := s.offices.Delete(c, s.store.Q(), id); err != nil {
		return err
	}

	return nil
}
