package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *Server) isSuperAdminOpenHandler(c echo.Context) error {
	isOpen, err := s.store.UsersStorage.IsSuperAdminOpen()
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	if isOpen {
		return c.String(http.StatusOK, "true")
	} else {
		return c.String(http.StatusOK, "false")
	}
}
