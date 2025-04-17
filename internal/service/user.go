package service

import (
	"github.com/velenac/ordination/internal/store"
)

type UserService struct {
	store store.UsersRepository
}
