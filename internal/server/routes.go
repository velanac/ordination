package server

import (
	"net/http"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/velenac/ordination/frontend"
	"github.com/velenac/ordination/internal/handlers"
	"github.com/velenac/ordination/internal/service"
	"github.com/velenac/ordination/pkg/auth"
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
	personalService := service.NewPersonalService(s.store)
	patientService := service.NewPatientService(s.store)
	officeService := service.NewOfficeService(s.store)
	serviceService := service.NewServiceService(s.store)
	usersService := service.NewUsersService(s.store)

	// Initialize the handlers with the store and other services
	healthHandler := handlers.NewHealthHandler(healtService)
	authHandler := handlers.NewAuthHandler(authService)
	personalHandler := handlers.NewPersonalHandler(personalService)
	patientHandler := handlers.NewPatientHandler(patientService)
	officeHandler := handlers.NewOfficeHandler(officeService)
	serviceHandler := handlers.NewServiceHandler(serviceService)
	usersHandler := handlers.NewUsersHandler(usersService)

	// Initialize the file store and pass it to the handlers
	e.Static("/files", "storage")

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
	v1Auth.POST("/auth/signout", authHandler.SignOut)
	v1Auth.GET("/personal", personalHandler.GetPersonal)
	v1Auth.POST("/personal", personalHandler.CreatePersonal)
	v1Auth.PATCH("/personal", personalHandler.UpdatePersonal)
	v1Auth.GET("/patients", patientHandler.Index)
	v1Auth.GET("/patients/:id", patientHandler.Show)
	v1Auth.POST("/patients", patientHandler.Create)
	v1Auth.PATCH("/patients/:id", patientHandler.Update)
	v1Auth.DELETE("/patients/:id", patientHandler.Delete)
	v1Auth.GET("/offices", officeHandler.Index)
	v1Auth.GET("/offices/:id", officeHandler.Show)
	v1Auth.POST("/offices", officeHandler.Create)
	v1Auth.PATCH("/offices/:id", officeHandler.Update)
	v1Auth.DELETE("/offices/:id", officeHandler.Delete)
	v1Auth.GET("/services", serviceHandler.Index)
	v1Auth.GET("/services/:id", serviceHandler.Show)
	v1Auth.POST("/services", serviceHandler.Create)
	v1Auth.PATCH("/services/:id", serviceHandler.Update)
	v1Auth.DELETE("/services/:id", serviceHandler.Delete)
	v1Auth.GET("/users", usersHandler.Index)
	v1Auth.POST("/users", usersHandler.Create)

	return e
}
