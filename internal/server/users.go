package server

import (
	"log"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/store"
)

type SignUpUserPayload struct {
	Email    string `json:"email" validate:"required,email"`
	FullName string `json:"fullName" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`

	CustomValidator struct {
		validator *validator.Validate
	}
}

func (s *Server) isSuperAdminOpenHandler(c echo.Context) error {
	isOpen, err := s.store.UsersStorage.IsSuperAdminOpen(c.Request().Context())
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	if isOpen {
		return c.String(http.StatusOK, "true")
	} else {
		return c.String(http.StatusOK, "false")
	}
}

func (s *Server) openSuperAdminHandler(c echo.Context) error {
	var payload SignUpUserPayload
	if err := c.Bind(&payload); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		log.Println("Validation error:", err.Error())
		return c.String(http.StatusBadRequest, "Validation failed")
	}

	user := &store.User{
		Email:    payload.Email,
		FullName: payload.FullName,
		Password: payload.Password,
	}

	if err := s.store.UsersStorage.OpenSuperAdmin(c.Request().Context(), user); err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.String(http.StatusOK, "Open super admin successfully")
}
