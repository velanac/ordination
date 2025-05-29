package models

import "golang.org/x/crypto/bcrypt"

type UserProfile struct {
	Id     string `json:"id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	Active bool   `json:"active"`
}

type UserCreate struct {
	UserName string `json:"username" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
	Role     string `json:"role" validate:"required,oneof=User SuperAdmin Doctor"`
}

type User struct {
	ID       string   `json:"id"`
	Email    string   `json:"email"`
	Password password `json:"-"`
	Role     string   `json:"role"`
	Active   bool     `json:"active"`
}

type UserList struct {
	ID       string `json:"id"`
	UserName string `json:"username"`
	Role     string `json:"role"`
}

type password struct {
	Text *string
	Hash []byte
}

func (p *password) Set(rawPassword string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(rawPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	p.Text = &rawPassword
	p.Hash = hash

	return nil
}

func (p *password) Compare(text string) error {
	return bcrypt.CompareHashAndPassword(p.Hash, []byte(text))
}
