package server

import (
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/velenac/ordination/internal/models"
)

func JWTFromCookie(secret string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			cookie, err := c.Cookie("auth")
			if err != nil {
				return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Missing or invalid token"})
			}

			tokenString := cookie.Value
			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				// Verifikacija metode
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, echo.NewHTTPError(http.StatusUnauthorized, "Unexpected signing method")
				}
				return []byte(secret), nil
			})

			if err != nil || !token.Valid {
				return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid token"})
			}

			userClaims := token.Claims.(jwt.MapClaims)
			userProfile := &models.UserProfile{
				Id:    userClaims["sub"].(string),
				Email: userClaims["email"].(string),
				Role:  userClaims["role"].(string),
			}

			c.Set("user", userProfile)

			return next(c)
		}
	}
}
