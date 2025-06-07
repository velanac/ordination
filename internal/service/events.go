package service

import (
	"context"

	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/store"
)

type EventsService struct {
	s        *store.Store
	events   *store.EventsRepository
	personal *store.PersonalRepository
	patients *store.PatientsRepository
	users    *store.UsersRepository
}

func NewEventsService(s *store.Store) *EventsService {
	return &EventsService{
		s:        s,
		events:   store.NewEventsRepository(),
		personal: store.NewPersonalRepository(),
		patients: store.NewPatientsRepository(),
		users:    store.NewUsersRepository(),
	}
}

// GetRecentAndUpcomingEvents retrieves a list of events that occurred in the last 24 hours.
func (s *EventsService) GetRecentAndUpcomingEvents(c context.Context) ([]*models.Event, error) {
	events, err := s.events.GetRecentAndUpcomingEvents(c, s.s.Q())
	if err != nil {
		return nil, err
	}

	return events, nil
}

// CreateDoctorEvent creates a new event for a doctor.
func (s *EventsService) CreateDoctorEvent(c context.Context, payload *models.DoctorEventPayload) error {
	user, err := s.users.GetByID(c, s.s.Q(), payload.UserID)
	if err != nil {
		return err
	}

	if user.Role != "doctor" {
		return ErrNotFound
	}

	personal, err := s.personal.GetPersonalByUserId(c, s.s.Q(), user.ID)
	if err != nil {
		return err
	}

	event := &models.Event{
		UserID:    user.ID,
		StartTime: payload.StartTime,
		EndTime:   payload.EndTime,
		OfficeID:  payload.OfficeID,
		Type:      "doctor",
		Title:     personal.Titles + " " + personal.FirstName + " " + personal.LastName,
	}

	err = s.events.Create(c, s.s.Q(), event)
	if err != nil {
		return err
	}

	return nil
}

// CreatePatientEvent creates a new event for a patient.
func (s *EventsService) CreatePatientEvent(c context.Context, payload *models.PatientEventPayload) error {
	patient, err := s.patients.GetByID(c, s.s.Q(), payload.PatientID)
	if err != nil {
		return err
	}

	if patient == nil {
		return ErrNotFound
	}

	event := &models.Event{
		PatientID: patient.ID,
		OfficeID:  payload.OfficeID,
		StartTime: payload.StartTime,
		EndTime:   payload.EndTime,
		Type:      "patient",
		Title:     patient.FirstName + " " + patient.LastName,
	}

	err = s.events.Create(c, s.s.Q(), event)
	if err != nil {
		return err
	}

	return nil
}

func (s *EventsService) GetByID(c context.Context, id string) (*models.Event, error) {
	event, err := s.events.GetByID(c, s.s.Q(), id)
	if err != nil {
		return nil, err
	}

	return event, nil
}

func (s *EventsService) UpdateDoctorEvent(c context.Context, id string, payload *models.DoctorEventPayload) error {
	user, err := s.users.GetByID(c, s.s.Q(), payload.UserID)
	if err != nil {
		return err
	}

	if user.Role != "doctor" {
		return ErrNotFound
	}

	personal, err := s.personal.GetPersonalByUserId(c, s.s.Q(), user.ID)
	if err != nil {
		return err
	}

	event := &models.Event{
		ID:        id,
		UserID:    user.ID,
		StartTime: payload.StartTime,
		EndTime:   payload.EndTime,
		Type:      "doctor",
		Title:     personal.Titles + " " + personal.FirstName + " " + personal.LastName,
	}

	// Check if the event exists
	exist, err := s.events.IsExists(c, s.s.Q(), id)
	if err != nil {
		return err
	}

	if !exist {
		return ErrNotFound
	}

	err = s.events.Update(c, s.s.Q(), event)
	if err != nil {
		return err
	}

	return nil
}

func (s *EventsService) UpdatePatientEvent(c context.Context, id string, payload *models.PatientEventPayload) error {
	patient, err := s.patients.GetByID(c, s.s.Q(), payload.PatientID)
	if err != nil {
		return err
	}

	event := &models.Event{
		ID:        id,
		PatientID: patient.ID,
		StartTime: payload.StartTime,
		EndTime:   payload.EndTime,
		Type:      "patient",
		Title:     patient.FirstName + " " + patient.LastName,
	}

	// Check if the event exists
	exist, err := s.events.IsExists(c, s.s.Q(), id)
	if err != nil {
		return err
	}

	if !exist {
		return ErrNotFound
	}

	err = s.events.Update(c, s.s.Q(), event)
	if err != nil {
		return err
	}

	return nil
}

func (s *EventsService) Delete(c context.Context, id string) error {
	// Check if the event exists
	exist, err := s.events.IsExists(c, s.s.Q(), id)
	if err != nil {
		return err
	}

	if !exist {
		return ErrNotFound
	}

	// Delete the event
	if err := s.events.Delete(c, s.s.Q(), id); err != nil {
		return err
	}

	return nil
}
