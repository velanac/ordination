package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordiora/internal/service"
)

type HealthHandler struct {
	service *service.HealthService
}

func NewHealthHandler(service *service.HealthService) *HealthHandler {
	return &HealthHandler{service: service}
}

func (h *HealthHandler) HealthCheck(c echo.Context) error {
	if err := h.service.HealthCheck(c.Request().Context()); err != nil {
		return NewInternalServerError("Failed to check health status")
	}

	return RespondOK(c, map[string]string{"status": "ok"})
}
