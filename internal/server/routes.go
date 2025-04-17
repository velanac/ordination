package server

import (
	"net/http"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/velenac/ordination/frontend"
	"github.com/velenac/ordination/internal/auth"
	"github.com/velenac/ordination/internal/handlers"
	"github.com/velenac/ordination/internal/service"
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
	e.HTTPErrorHandler = handlers.CustomErrorHandler
	frontend.RegisterFrondEndHandlers(e)
	authenticator := auth.NewJWTAuthenticator(s.config.Auth.Token.Secret, s.config.Auth.Token.Iss, s.config.Auth.Token.Iss)

	// Initialize the store and other services here
	healtService := service.NewHealthService(s.store)
	authService := service.NewAuthService(s.store, authenticator)

	// Initialize the handlers with the store and other services
	healthHandler := handlers.NewHealthHandler(healtService)
	authHandler := handlers.NewAuthHandler(authService)

	api := e.Group("/api")
	v1 := api.Group("/v1")
	v1.GET("/health", healthHandler.HealthCheck)

	v1.POST("/auth/signin", authHandler.SignIn)
	v1.GET("/auth/isopen", authHandler.IsSuperAdminOpen)
	v1.POST("/auth/opensuperadmin", authHandler.OpenSuperAdmin)

	apiAuth := e.Group("/api")
	v1Auth := apiAuth.Group("/v1")
	v1Auth.Use(JWTFromCookie("secret"))
	v1Auth.GET("/auth/profile", authHandler.GetUserProfile)

	return e
}
