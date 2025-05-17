package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/service"
)

type PatientHandler struct {
	patients *service.PatientService
}

func NewPatientHandler(service *service.PatientService) *PatientHandler {
	return &PatientHandler{patients: service}
}

func (h *PatientHandler) Index(c echo.Context) error {
	patients, err := h.patients.GetList(c.Request().Context())
	if err != nil {
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, patients)
}

func (h *PatientHandler) Show(c echo.Context) error {
	patientId := c.Param("id")
	patient, err := h.patients.GetById(c.Request().Context(), patientId)
	if err != nil {
		return RespondNoContent(c)
	}

	return RespondOK(c, patient)
}

func (h *PatientHandler) Create(c echo.Context) error {
	var payload models.PatientPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.patients.Create(c.Request().Context(), &payload); err != nil {
		return NewInternalServerError("Failed to create patient")
	}

	return RespondCreated(c, "Patient created successfully")
}

func (h *PatientHandler) Update(c echo.Context) error {
	patientId := c.Param("id")
	if patientId == "" {
		return NewBadRequest("Invalid patient ID")
	}

	var payload models.PatientPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.patients.Update(c.Request().Context(), patientId, &payload); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Patient not found")
		}

		return NewInternalServerError("Failed to update patient")
	}

	return RespondOK(c, "Patient updated successfully")
}

func (h *PatientHandler) Delete(c echo.Context) error {
	patientId := c.Param("id")
	if patientId == "" {
		return NewBadRequest("Invalid patient ID")
	}

	if err := h.patients.Delete(c.Request().Context(), patientId); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Patient not found")
		}

		return NewInternalServerError("Failed to delete patient")
	}

	return RespondNoContent(c)
}
