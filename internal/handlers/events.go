package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordiora/internal/models"
	"github.com/velenac/ordiora/internal/service"
	"go.uber.org/zap"
)

type EventHandler struct {
	events *service.EventsService
	logger *zap.SugaredLogger
}

func NewEventHandler(service *service.EventsService, logger *zap.SugaredLogger) *EventHandler {
	return &EventHandler{events: service, logger: logger}
}

// Index retrieves a list of recent and upcoming events.
func (h *EventHandler) Index(c echo.Context) error {
	events, err := h.events.GetRecentAndUpcomingEvents(c.Request().Context())
	if err != nil {
		h.logger.Errorw("Error retrieving events", "error", err)
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, events)
}

// GetRecentAndUpcomingOfficesEvents retrieves a list of recent and upcoming events for offices.
func (h *EventHandler) GetRecentAndUpcomingOfficesEvents(c echo.Context) error {
	officesEvents, err := h.events.GetRecentAndUpcomingOfficesEvents(c.Request().Context())
	if err != nil {
		h.logger.Errorw("Error retrieving offices events", "error", err)
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, officesEvents)
}

// Show retrieves a specific event by its ID.
func (h *EventHandler) Show(c echo.Context) error {
	eventId := c.Param("id")
	event, err := h.events.GetByID(c.Request().Context(), eventId)
	if err != nil {
		h.logger.Errorw("Error retrieving event by ID", "error", err, "eventId", eventId)
		return NewInternalServerError("Server error")
	}

	if event == nil {
		return NewNotFound("Event not found")
	}

	return RespondOK(c, event)
}

// CreateDoctorEvent creates a new event for a doctor.
func (h *EventHandler) CreateDoctorEvent(c echo.Context) error {
	var payload models.DoctorEventPayload
	if err := c.Bind(&payload); err != nil {
		h.logger.Errorw("Error binding request payload", "error", err)
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		h.logger.Errorw("Validation failed for doctor event payload", "error", err)
		return NewBadRequest("Validation failed")
	}

	if err := h.events.CreateDoctorEvent(c.Request().Context(), &payload); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Doctor not found")
		}

		h.logger.Errorw("Failed to create doctor event", "error", err, "payload", payload)

		return NewInternalServerError("Failed to create doctor event")
	}

	return RespondCreated(c, "Doctor event created successfully")
}

// CreatePatientEvent creates a new event for a patient.
func (h *EventHandler) CreatePatientEvent(c echo.Context) error {
	var payload models.PatientEventPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.events.CreatePatientEvent(c.Request().Context(), &payload); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Patient not found")
		}

		h.logger.Errorw("Failed to create patient event", "error", err, "payload", payload)

		return NewInternalServerError("Failed to create patient event")
	}

	return RespondCreated(c, "Patient event created successfully")
}

// Update doctor event by ID.
func (h *EventHandler) UpdateDoctorEvent(c echo.Context) error {
	eventId := c.Param("id")
	var payload models.DoctorEventPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.events.UpdateDoctorEvent(c.Request().Context(), eventId, &payload); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Event not found")
		}

		h.logger.Errorw("Failed to update doctor event", "error", err, "eventId", eventId, "payload", payload)

		return NewInternalServerError("Failed to update doctor event")
	}

	return RespondOK(c, "Doctor event updated successfully")
}

// Update patient event by ID.
func (h *EventHandler) UpdatePatientEvent(c echo.Context) error {
	eventId := c.Param("id")
	var payload models.PatientEventPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.events.UpdatePatientEvent(c.Request().Context(), eventId, &payload); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Event not found")
		}

		h.logger.Errorw("Failed to update patient event", "error", err, "eventId", eventId, "payload", payload)

		return NewInternalServerError("Failed to update patient event")
	}

	return RespondOK(c, "Patient event updated successfully")
}

// Delete removes an event by its ID.
func (h *EventHandler) Destroy(c echo.Context) error {
	eventId := c.Param("id")
	if err := h.events.Delete(c.Request().Context(), eventId); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Event not found")
		}

		h.logger.Errorw("Failed to delete event", "error", err, "eventId", eventId)

		return NewInternalServerError("Failed to delete event")
	}

	return RespondOK(c, "Event deleted successfully")
}
