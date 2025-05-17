package service

import (
	"context"

	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/store"
)

type PatientService struct {
	store    *store.Store
	patients *store.PatientsRepository
}

func NewPatientService(s *store.Store) *PatientService {
	return &PatientService{
		store:    s,
		patients: store.NewPatientsRepository(),
	}
}

func (s *PatientService) GetList(c context.Context) ([]*models.Patient, error) {
	patients, err := s.patients.GetList(c, s.store.Q())
	if err != nil {
		return nil, err
	}

	return patients, nil
}

func (s *PatientService) GetById(c context.Context, id string) (*models.Patient, error) {
	patient, err := s.patients.GetById(c, s.store.Q(), id)
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func (s *PatientService) Create(c context.Context, payload *models.PatientPayload) error {
	patient := payload.GetPatient()

	if err := s.patients.Create(c, s.store.Q(), patient); err != nil {
		return err
	}

	return nil
}

func (s *PatientService) Update(c context.Context, id string, payload *models.PatientPayload) error {
	patient := payload.GetPatient()

	// Check if the patient exists
	exist, err := s.patients.IsExists(c, s.store.Q(), id)
	if err != nil {
		return err
	}

	if !exist {
		return ErrNotFound
	}

	if err := s.patients.Update(c, s.store.Q(), patient, id); err != nil {
		return err
	}

	return nil
}

func (s *PatientService) Delete(c context.Context, id string) error {
	// Check if the patient exists
	exist, err := s.patients.IsExists(c, s.store.Q(), id)
	if err != nil {
		return err
	}

	if !exist {
		return ErrNotFound
	}
	// Delete the patient
	if err := s.patients.Delete(c, s.store.Q(), id); err != nil {
		return err
	}

	return nil
}
