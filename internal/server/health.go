package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *Server) healthCheckHandler(c echo.Context) error {
	if err := s.store.UtilsStorage.Ping(); err != nil {
		return c.String(http.StatusInternalServerError, "Database connection error")
	}

	return c.String(http.StatusOK, "OK")
}
