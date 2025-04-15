package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type SuccessResponse struct {
	Data any `json:"data,omitempty"`
	Code int `json:"code"`
}

func RespondOK(c echo.Context, data interface{}) error {
	return c.JSON(http.StatusOK, SuccessResponse{
		Data: data,
		Code: http.StatusOK,
	})
}

func RespondCreated(c echo.Context, data interface{}) error {
	return c.JSON(http.StatusCreated, SuccessResponse{
		Data: data,
		Code: http.StatusCreated,
	})
}

func RespondNoContent(c echo.Context) error {
	return c.JSON(http.StatusNoContent, SuccessResponse{})
}
