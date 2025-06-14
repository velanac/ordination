package handlers

import (
	"log"

	"github.com/labstack/echo/v4"
	"github.com/velenac/ordiora/internal/service"
)

type DoctorsHandler struct {
	doctors *service.DoctorsService
}

func NewDoctorsHandler(service *service.DoctorsService) *DoctorsHandler {
	return &DoctorsHandler{doctors: service}
}

// Index retrieves a list of doctors.
func (h *DoctorsHandler) Index(c echo.Context) error {
	doctors, err := h.doctors.GetList(c.Request().Context())
	if err != nil {
		log.Println("Error retrieving doctors:", err)
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, doctors)
}
