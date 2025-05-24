package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/service"
)

type ServiceHandler struct {
	services *service.ServiceService
}

func NewServiceHandler(service *service.ServiceService) *ServiceHandler {
	return &ServiceHandler{services: service}
}

func (h *ServiceHandler) Index(c echo.Context) error {
	services, err := h.services.GetList(c.Request().Context())
	if err != nil {
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, services)
}

func (h *ServiceHandler) Show(c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return NewBadRequest("ID is required")
	}

	service, err := h.services.GetByID(c.Request().Context(), id)
	if err != nil {
		return NewInternalServerError("Server error")
	}

	if service == nil {
		return NewNotFound("Service not found")
	}

	return RespondOK(c, service)
}

func (h *ServiceHandler) Create(c echo.Context) error {
	var payload models.ServicePayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.services.Create(c.Request().Context(), &payload); err != nil {
		return NewInternalServerError("Failed to create service")
	}

	return RespondCreated(c, "Service created successfully")
}

func (h *ServiceHandler) Update(c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return NewBadRequest("Invalid service ID")
	}

	var payload models.ServicePayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.services.Update(c.Request().Context(), id, &payload); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Service not found")
		}

		return NewInternalServerError("Failed to update service")
	}

	return RespondOK(c, "Service updated successfully")
}

func (h *ServiceHandler) Delete(c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return NewBadRequest("Invalid service ID")
	}

	if err := h.services.Delete(c.Request().Context(), id); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("Service not found")
		}

		return NewInternalServerError("Failed to delete service")
	}

	return RespondOK(c, "Service deleted successfully")
}
