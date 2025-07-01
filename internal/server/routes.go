package server

import (
	"net/http"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/velenac/ordiora/frontend"
	"github.com/velenac/ordiora/internal/handlers"
	"github.com/velenac/ordiora/internal/service"
	"github.com/velenac/ordiora/pkg/auth"
	"go.uber.org/zap"
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
	logger, _ := zap.NewProduction()
	defer logger.Sync()

	sugarLoger := logger.Sugar()

	e.Use(ZapLogger(logger))
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
	eventsService := service.NewEventsService(s.store, sugarLoger)
	doctorsService := service.NewDoctorsService(s.store)

	// Initialize the handlers with the store and other services
	healthHandler := handlers.NewHealthHandler(healtService)
	authHandler := handlers.NewAuthHandler(authService)
	personalHandler := handlers.NewPersonalHandler(personalService)
	patientHandler := handlers.NewPatientHandler(patientService, sugarLoger)
	officeHandler := handlers.NewOfficeHandler(officeService)
	serviceHandler := handlers.NewServiceHandler(serviceService)
	usersHandler := handlers.NewUsersHandler(usersService)
	eventsHandler := handlers.NewEventHandler(eventsService, sugarLoger)
	doctorsHandler := handlers.NewDoctorsHandler(doctorsService)

	// Initialize the file store and pass it to the handlers
	e.Static("/files", "storage")

	v1 := e.Group("/api/v1")
	v1.GET("/health", healthHandler.HealthCheck)
	v1.POST("/auth/signin", authHandler.SignIn)
	v1.GET("/auth/isopen", authHandler.IsSuperAdminOpen)
	v1.POST("/auth/opensuperadmin", authHandler.OpenSuperAdmin)

	v1Auth := e.Group("/api/v1")
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
	v1Auth.DELETE("/patients/:id", patientHandler.Destroy)
	v1Auth.GET("/offices", officeHandler.Index)
	v1Auth.GET("/offices/:id", officeHandler.Show)
	v1Auth.POST("/offices", officeHandler.Create)
	v1Auth.PATCH("/offices/:id", officeHandler.Update)
	v1Auth.DELETE("/offices/:id", officeHandler.Destory)
	v1Auth.GET("/services", serviceHandler.Index)
	v1Auth.GET("/services/:id", serviceHandler.Show)
	v1Auth.POST("/services", serviceHandler.Create)
	v1Auth.PATCH("/services/:id", serviceHandler.Update)
	v1Auth.DELETE("/services/:id", serviceHandler.Destory)
	v1Auth.GET("/events", eventsHandler.Index)
	v1Auth.GET("/offices-events", eventsHandler.GetRecentAndUpcomingOfficesEvents)
	v1Auth.GET("/events/:id", eventsHandler.Show)
	v1Auth.POST("/events/doctor", eventsHandler.CreateDoctorEvent)
	v1Auth.POST("/events/patient", eventsHandler.CreatePatientEvent)
	v1Auth.PATCH("/events/doctor/:id", eventsHandler.UpdateDoctorEvent)
	v1Auth.PATCH("/events/patient/:id", eventsHandler.UpdatePatientEvent)
	v1Auth.DELETE("/events/:id", eventsHandler.Destroy)
	v1Auth.GET("/doctors", doctorsHandler.Index)
	superAdminAPI := v1Auth.Group("/users", IsSuperAdmin)
	superAdminAPI.GET("", usersHandler.Index)
	superAdminAPI.GET("/:id", usersHandler.Show)
	superAdminAPI.POST("", usersHandler.Create)
	superAdminAPI.DELETE("/:id", usersHandler.Destory)
	superAdminAPI.PATCH("/:id/general", usersHandler.UpdateGeneralSettings)

	return e
}
