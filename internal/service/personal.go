package service

import (
	"context"

	"github.com/velenac/ordiora/internal/models"
	"github.com/velenac/ordiora/internal/store"
)

type PersonalService struct {
	store    *store.Store
	personal *store.PersonalRepository
}

func NewPersonalService(s *store.Store) *PersonalService {
	return &PersonalService{
		store:    s,
		personal: store.NewPersonalRepository(),
	}
}

// GetPersonalByUserId retrieves personal information for a user by their user ID.
func (s *PersonalService) GetPersonalByUserId(c context.Context, userId string) (*models.Personal, error) {
	personal, err := s.personal.GetPersonalByUserId(c, s.store.Q(), userId)

	if err != nil {
		return nil, err
	}

	return personal, nil
}

// CreatePersonal creates a new personal record for a user.
func (s *PersonalService) CreatePersonal(c context.Context, userId string, payload *models.PersonalPayload) error {
	personal := &models.Personal{
		UserId:     userId,
		Titles:     payload.Titles,
		FirstName:  payload.FirstName,
		LastName:   payload.LastName,
		Phone:      payload.Phone,
		Address:    payload.Address,
		City:       payload.City,
		State:      payload.State,
		Country:    payload.Country,
		PostalCode: payload.PostalCode,
	}

	if err := s.personal.CreatePersonal(c, s.store.Q(), personal); err != nil {
		return err
	}

	return nil
}

// UpdatePersonal updates the personal information for a user.
func (s *PersonalService) UpdatePersonal(c context.Context, userId string, payload *models.PersonalPayload) error {
	personal := &models.Personal{
		UserId:     userId,
		Titles:     payload.Titles,
		FirstName:  payload.FirstName,
		LastName:   payload.LastName,
		Phone:      payload.Phone,
		Address:    payload.Address,
		City:       payload.City,
		State:      payload.State,
		Country:    payload.Country,
		PostalCode: payload.PostalCode,
	}

	if err := s.personal.UpdatePersonal(c, s.store.Q(), personal); err != nil {
		return err
	}

	return nil
}
