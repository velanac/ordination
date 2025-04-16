package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type SignInPayload struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

func (s *Server) signInHandler(c echo.Context) error {
	var payload SignInPayload
	if err := c.Bind(&payload); err != nil {
		return NewBadRequest("Invalid request payload")
	}

	if err := c.Validate(payload); err != nil {
		return NewBadRequest("Validation failed")
	}

	user, err := s.store.UsersStorage.GetUserByEmail(c.Request().Context(), payload.Email)
	if err != nil {
		fmt.Println(err)
		return NewUnautorize("Invalid email or password")
	}

	if err := user.Password.Compare(payload.Password); err != nil {
		fmt.Println(err)
		return NewUnautorize("Invalid email or password")
	}

	// generate token
	claims := jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 3).Unix(),
		"iat": time.Now().Unix(),
		"nbf": time.Now().Unix(),
		// "iss": app.config.auth.token.iss,
		// "aud": app.config.auth.token.iss,
	}

	token, err := s.authentication.GenerateToken(claims)
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
