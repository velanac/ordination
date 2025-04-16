package server

import (
	"net/http"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/velenac/ordination/frontend"
)

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i any) error {
	if err := cv.validator.Struct(i); err != nil {
		// Optionally, you could return the error to give each route more control over the status code
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (s *Server) RegisterRoutes() http.Handler {
	e := echo.New()

	e.HTTPErrorHandler = customErrorHandler
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"https://*", "http://*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	e.Validator = &CustomValidator{validator: validator.New()}

	frontend.RegisterFrondEndHandlers(e)

	api := e.Group("/api")
	v1 := api.Group("/v1")
	v1.GET("/health", s.healthCheckHandler)
	v1.GET("/init", s.isSuperAdminOpenHandler)
	v1.POST("/opensuperadmin", s.openSuperAdminHandler)
	v1.POST("/auth/signin", s.signInHandler)
	apiAuth := e.Group("/api")
	v1Auth := apiAuth.Group("/v1")
	v1Auth.Use(JWTFromCookie("secret"))
	v1Auth.GET("/users/profile", s.getUserProfile)

	return e
}
