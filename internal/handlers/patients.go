package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/service"
)

type PatientHandler struct {
	service *service.PatientService
}

func NewPatientHandler(service *service.PatientService) *PatientHandler {
	return &PatientHandler{service: service}
}

func (h *PatientHandler) Index(c echo.Context) error {
	patients, err := h.service.GetAllPatients(c.Request().Context())
	if err != nil {
		return RespondNoContent(c)
	}

	return RespondOK(c, patients)
}

func (h *PatientHandler) Show(c echo.Context) error {
	patientId := c.Param("id")
	patient, err := h.service.GetPatientById(c.Request().Context(), patientId)
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

	if err := h.service.CreatePatient(c.Request().Context(), &payload); err != nil {
		return NewInternalServerError("Failed to create patient")
	}

	return RespondCreated(c, "Patient created successfully")
}
