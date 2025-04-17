package handlers

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/models"
)

func getUserFromContext(c echo.Context) (*models.UserProfile, error) {
	user := c.Get("user")
	if user == nil {
		return nil, NewUnauthorized("User not found in context")
	}

	userProfile, ok := user.(*models.UserProfile)
	if !ok {
		return nil, NewUnauthorized("Invalid user profile")
	}

	return userProfile, nil
}

// Globalni error handler
func CustomErrorHandler(err error, c echo.Context) {
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
