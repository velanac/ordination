package handlers

import (
	"github.com/labstack/echo/v4"
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
