package service

import (
	"context"

	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/store"
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
