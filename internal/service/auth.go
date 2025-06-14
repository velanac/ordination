package service

import (
	"context"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/velenac/ordiora/internal/models"
	"github.com/velenac/ordiora/internal/store"
	"github.com/velenac/ordiora/pkg/auth"
)

type AuthService struct {
	store         *store.Store
	auth          *store.AuthRepository
	authenticator *auth.JWTAuthenticator
}

func NewAuthService(s *store.Store, a *auth.JWTAuthenticator) *AuthService {
	return &AuthService{
		store:         s,
		auth:          store.NewAuthRepository(),
		authenticator: a,
	}
}

// CheckCredentials checks if the provided email and password are valid credentials for a user.
func (s *AuthService) CheckCredentials(c context.Context, email string, password string) (*models.User, error) {
	user, err := s.auth.GetUserByEmail(c, s.store.Q(), email)
	if err != nil {
		return nil, err
	}

	if err := user.Password.Compare(password); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *AuthService) GenerateToken(user *models.User) (string, error) {
	claims := jwt.MapClaims{
		"sub":   user.ID,
		"email": user.Email,
		"role":  user.Role,
		"exp":   time.Now().Add(time.Hour * 24 * 3).Unix(),
		"iat":   time.Now().Unix(),
		"nbf":   time.Now().Unix(),
		// "iss": app.config.auth.token.iss,
		// "aud": app.config.auth.token.iss,
	}

	token, err := s.authenticator.GenerateToken(claims)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (s *AuthService) IsSuperAdminOpen(c context.Context) (bool, error) {
	isOpen, err := s.auth.IsSuperAdminOpen(c, s.store.Q())
	if err != nil {
		return true, err
	}

	return isOpen, nil
}

func (s *AuthService) OpenSuperAdmin(c context.Context, payload *models.OpenSuperAdminPayload) error {
	isExists, err := s.auth.IsSuperAdminOpen(c, s.store.Q())
	if err != nil {
		return err
	}

	if isExists {
		return models.ErrSuperAdminAlreadyExists
	}

	user := &models.User{
		Email: payload.Email,
	}

	if err := user.Password.Set(payload.Password); err != nil {
		return err
	}

	if err := s.auth.OpenSuperAdmin(c, s.store.Q(), user); err != nil {
		return err
	}

	return nil
}
