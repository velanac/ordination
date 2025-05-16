package service

import "github.com/velenac/ordination/internal/store"

type PatientService struct {
	store    *store.Store
	patients *store.PatientsRepository
}
