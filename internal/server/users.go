package server

import (
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/store"
)

type OpenSuperAdminPayload struct {
	Email    string `json:"email" validate:"required,email"`
	FullName string `json:"fullName" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`
}

func (s *Server) isSuperAdminOpenHandler(c echo.Context) error {
	isOpen, err := s.store.UsersStorage.IsSuperAdminOpen(c.Request().Context())
	if err != nil {
		return NewInternalServerError("Failed to check super admin status")
	}

	return RespondOK(c, map[string]bool{"isOpen": isOpen})
}

func (s *Server) openSuperAdminHandler(c echo.Context) error {
	var payload OpenSuperAdminPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed: " + err.Error())
	}

	isExists, err := s.store.UsersStorage.IsSuperAdminOpen(c.Request().Context())
	if err != nil {
		return NewInternalServerError("Failed to check super admin status")
	}

	if isExists {
		return NewBadRequest("Super admin already exists")
	}

	user := &store.User{
		Email:    payload.Email,
		FullName: payload.FullName,
	}

	if err := user.Password.Set(payload.Password); err != nil {
		return NewInternalServerError("Failed to set password")
	}

	if err := s.store.UsersStorage.OpenSuperAdmin(c.Request().Context(), user); err != nil {
		return NewInternalServerError("Failed to create super admin")
	}

	return RespondNoContent(c)
}

func (s *Server) getUserProfile(c echo.Context) error {
	claims := c.Get("user").(jwt.Claims)
	userClaims := claims.(jwt.MapClaims)

	sub := userClaims["sub"].(string)

	return c.JSON(http.StatusOK, map[string]string{
		"sub": sub,
	})
}
