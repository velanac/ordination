package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/service"
)

type UsersHandler struct {
	users *service.UsersService
}

func NewUsersHandler(users *service.UsersService) *UsersHandler {
	return &UsersHandler{users: users}
}

func (h *UsersHandler) Index(c echo.Context) error {
	users, err := h.users.GetList(c.Request().Context())
	if err != nil {
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, users)
}

func (h *UsersHandler) Show(c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return NewBadRequest("User ID is required")
	}

	user, err := h.users.GetByID(c.Request().Context(), id)
	if err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("User not found")
		}
		return NewInternalServerError("Server error")
	}

	return RespondOK(c, user)
}

func (h *UsersHandler) Create(c echo.Context) error {
	var user models.UserCreate
	if err := c.Bind(&user); err != nil {
		return NewBadRequest("Invalid request data")
	}

	if err := c.Validate(&user); err != nil {
		return NewBadRequest(err.Error())
	}

	if err := h.users.Create(c.Request().Context(), &user); err != nil {
		return NewInternalServerError("Failed to create user")
	}

	return RespondCreated(c, "User created successfully")
}

func (h *UsersHandler) Delete(c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return NewBadRequest("User ID is required")
	}

	if err := h.users.Delete(c.Request().Context(), id); err != nil {
		if err == service.ErrNotFound {
			return NewNotFound("User not found")
		}
		if err == service.ErrForbidden {
			return NewForbidden("Cannot delete SuperAdmin user")
		}

		return NewInternalServerError("Server error")
	}

	return RespondNoContent(c)
}
