package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/service"
)

type OfficeHandler struct {
	offices *service.OfficeService
}

func NewOfficeHandler(service *service.OfficeService) *OfficeHandler {
	return &OfficeHandler{offices: service}
}

func (h *OfficeHandler) Index(c echo.Context) error {
	offices, err := h.offices.GetList(c.Request().Context())
	if err != nil {
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, offices)
}

func (h *OfficeHandler) Show(c echo.Context) error {
	officeId := c.Param("id")

	office, err := h.offices.GetById(c.Request().Context(), officeId)

	if err != nil {
		return NewInternalServerError("Server error")
	}

	if office == nil {
		return NewNotFound("Office not found")
	}

	return RespondOK(c, office)
}

func (h *OfficeHandler) Create(c echo.Context) error {
	payload := &models.OfficePayload{}
	if err := c.Bind(payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := h.offices.Create(c.Request().Context(), payload); err != nil {
		return NewInternalServerError("Server error")
	}

	return RespondCreated(c, nil)
}

func (h *OfficeHandler) Update(c echo.Context) error {
	officeId := c.Param("id")
	payload := &models.OfficePayload{}
	if err := c.Bind(payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := h.offices.Update(c.Request().Context(), officeId, payload); err != nil {
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, "Office updated successfully")
}

func (h *OfficeHandler) Destory(c echo.Context) error {
	officeId := c.Param("id")
	if err := h.offices.Delete(c.Request().Context(), officeId); err != nil {
		return NewInternalServerError("Server error")
	}

	return RespondNoContent(c)
}
