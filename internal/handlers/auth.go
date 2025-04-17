package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/service"
)

type AuthHandler struct {
	service *service.AuthService
}

func NewAuthHandler(service *service.AuthService) *AuthHandler {
	return &AuthHandler{service: service}
}

func (h *AuthHandler) SignIn(c echo.Context) error {
	var payload models.SignInPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	user, err := h.service.CheckCredentials(c.Request().Context(), payload.Email, payload.Password)
	if err != nil {
		return NewUnauthorized("Invalid email or password")
	}

	token, err := h.service.GenerateToken(user)
	if err != nil {
		return NewInternalServerError("Failed to generate token")
	}

	cookie := new(http.Cookie)
	cookie.Name = "auth"
	cookie.Value = token
	cookie.Expires = time.Now().Add(time.Hour * 24 * 3)
	c.SetCookie(cookie)

	return RespondOK(c, map[string]string{"token": token})
}

func (h *AuthHandler) IsSuperAdminOpen(c echo.Context) error {
	isOpen, err := h.service.IsSuperAdminOpen(c.Request().Context())
	if err != nil {
		return NewInternalServerError("Failed to check admin status")
	}

	return RespondOK(c, map[string]bool{"isOpen": isOpen})
}

func (h *AuthHandler) OpenSuperAdmin(c echo.Context) error {
	var payload models.OpenSuperAdminPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	if err := h.service.OpenSuperAdmin(c.Request().Context(), &payload); err != nil {
		if err == models.ErrSuperAdminAlreadyExists {
			return NewForbidden("Forbidden")
		}

		return NewInternalServerError("Failed to open super admin")
	}

	return RespondOK(c, map[string]string{"message": "Super admin opened successfully"})
}

func (h *AuthHandler) GetUserProfile(c echo.Context) error {
	user, err := getUserFromContext(c)
	if err != nil {
		return NewUnauthorized("User not found in context")
	}

	return RespondOK(c, user)
}
