package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordiora/internal/models"
	"github.com/velenac/ordiora/internal/service"
)

type PersonalHandler struct {
	service *service.PersonalService
}

func NewPersonalHandler(service *service.PersonalService) *PersonalHandler {
	return &PersonalHandler{service: service}
}

func (h *PersonalHandler) GetPersonal(c echo.Context) error {
	user, err := getUserFromContext(c)
	if err != nil {
		return NewUnauthorized("User not found in context")
	}

	personal, err := h.service.GetPersonalByUserId(c.Request().Context(), user.Id)
	if err != nil {
		return RespondNoContent(c)
	}

	return RespondOK(c, personal)
}

func (h *PersonalHandler) CreatePersonal(c echo.Context) error {
	user, err := getUserFromContext(c)
	if err != nil {
		return NewUnauthorized("User not found in context")
	}

	var payload models.PersonalPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.service.CreatePersonal(c.Request().Context(), user.Id, &payload); err != nil {
		return NewInternalServerError("Failed to create personal information")
	}

	return RespondCreated(c, "Personal information created successfully")
}

func (h *PersonalHandler) UpdatePersonal(c echo.Context) error {
	user, err := getUserFromContext(c)
	if err != nil {
		return NewUnauthorized("User not found in context")
	}

	var payload models.PersonalPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.service.UpdatePersonal(c.Request().Context(), user.Id, &payload); err != nil {
		return NewInternalServerError("Failed to update personal information")
	}

	return RespondOK(c, "Personal information updated successfully")
}
