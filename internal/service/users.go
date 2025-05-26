package service

import (
	"context"

	"github.com/velenac/ordination/internal/models"
	"github.com/velenac/ordination/internal/store"
)

type UsersService struct {
	store *store.Store
	users *store.UsersRepository
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
