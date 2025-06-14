package service

import (
	"context"

	"github.com/velenac/ordiora/internal/models"
	"github.com/velenac/ordiora/internal/store"
)

type UsersService struct {
	store *store.Store
	users *store.UsersRepository
	roles *store.RolesRepository
}

func NewUsersService(s *store.Store) *UsersService {
	return &UsersService{
		store: s,
		users: store.NewUsersRepository(),
	}
}

func (s *UsersService) GetList(ctx context.Context) ([]*models.UserList, error) {
	return s.users.GetList(ctx, s.store.Q())
}

func (s *UsersService) GetByID(ctx context.Context, id string) (*models.User, error) {
	user, err := s.users.GetByID(ctx, s.store.Q(), id)
	if err != nil {
		return nil, err
	}

	if user == nil {
		return nil, ErrNotFound
	}

	return user, nil
}

func (s *UsersService) Create(ctx context.Context, user *models.UserCreate) error {
	role, err := s.roles.GetByName(ctx, s.store.Q(), user.Role)
	if err != nil {
		return err
	}

	if role == nil {
		return ErrNotFound
	}

	newUser := &models.User{
		Email: user.UserName,
		Role:  role.Name,
	}

	if err := newUser.Password.Set(user.Password); err != nil {
		return err
	}

	return s.users.Create(ctx, s.store.Q(), newUser)
}

func (s *UsersService) Delete(ctx context.Context, id string) error {
	// Check if the user exists
	user, err := s.users.GetByID(ctx, s.store.Q(), id)
	if err != nil {
		return err
	}

	if user == nil {
		return ErrNotFound
	}

	if user.Role == "SuperAdmin" {
		return ErrForbidden
	}

	if err := s.users.Delete(ctx, s.store.Q(), id); err != nil {
		return err
	}
	return nil
}

func (s *UsersService) UpdateGeneralSettings(ctx context.Context, id string, settings *models.UserGeneralSettings) error {
	// Check if the user exists
	user, err := s.users.GetByID(ctx, s.store.Q(), id)
	if err != nil {
		return err
	}

	if user == nil {
		return ErrNotFound
	}

	role, err := s.roles.GetByName(ctx, s.store.Q(), settings.Role)
	if err != nil {
		return err
	}

	if role == nil {
		return ErrNotFound
	}

	update := &models.User{
		ID:     id,
		Active: settings.Active,
		Role:   settings.Role,
	}

	return s.users.UpdateGeneralSettings(ctx, s.store.Q(), update)
}
