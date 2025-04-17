package handlers

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

type ErrorResponse struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}

type ApiError struct {
	Code    int
	Message string
}

func (e *ApiError) Error() string {
	return e.Message
}

func NewBadRequest(msg string) *ApiError {
	return &ApiError{
		Code:    http.StatusBadRequest,
		Message: msg,
	}
}

func NewInternalServerError(msg string) *ApiError {
	return &ApiError{
		Code:    http.StatusInternalServerError,
		Message: msg,
	}
}

func NewUnauthorized(msg string) *ApiError {
	return &ApiError{
		Code:    http.StatusUnauthorized,
		Message: msg,
	}
}

func NewForbidden(msg string) *ApiError {
	return &ApiError{
		Code:    http.StatusForbidden,
		Message: msg,
	}
}
