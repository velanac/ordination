package server

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
)

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

// Globalni error handler
func customErrorHandler(err error, c echo.Context) {
	var (
		code    = http.StatusInternalServerError
		message = "Internal Server Error"
	)

	// Ako je greška tipa ApiError
	var appErr *ApiError
	if errors.As(err, &appErr) {
		code = appErr.Code
		message = appErr.Message
	}

	// Ako je već Echo HTTPError
	if he, ok := err.(*echo.HTTPError); ok {
		code = he.Code
		message = he.Message.(string)
	}

	// Loguj grešku po potrebi
	c.Logger().Error(err)

	// Vrati response
	if !c.Response().Committed {
		c.JSON(code, ErrorResponse{
			Message: message,
			Code:    code,
		})
	}
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

func NewUnautorize(msg string) *ApiError {
	return &ApiError{
		Code:    http.StatusUnauthorized,
		Message: msg,
	}
}
