package service

import (
	"context"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/velenac/ordination/internal/auth"
	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/store"
)

type AuthService struct {
	store         store.AuthRepository
	authenticator *auth.JWTAuthenticator
}

func NewAuthService(s store.AuthRepository, a *auth.JWTAuthenticator) *AuthService {
	return &AuthService{
		store:         s,
		authenticator: a,
	}
}

// CheckCredentials checks if the provided email and password are valid credentials for a user.
func (s *AuthService) CheckCredentials(c context.Context, email string, password string) (*models.User, error) {
	user, err := s.store.GetUserByEmail(c, email)
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

func (s *AuthService) IsSuperAdminOpen(c context.Context) (map[string]bool, error) {
	isOpen, err := s.store.IsSuperAdminOpen(c)
	if err != nil {
		return nil, err
	}

	return map[string]bool{"isOpen": isOpen}, nil
}

func (s *AuthService) OpenSuperAdmin(c context.Context, payload *models.OpenSuperAdminPayload) error {
	isExists, err := s.store.IsSuperAdminOpen(c)
	if err != nil {
		return err
	}

	if isExists {
		return models.ErrSuperAdminAlreadyExists
	}

	user := &models.User{
		Email:    payload.Email,
		FullName: payload.FullName,
	}

	if err := user.Password.Set(payload.Password); err != nil {
		return err
	}

	if err := s.store.OpenSuperAdmin(c, user); err != nil {
		return err
	}

	return nil
}
