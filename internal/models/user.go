package models

import (
	"database/sql/driver"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type UserProfile struct {
	Id     string `json:"id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	Active bool   `json:"active"`
}

type UserGeneralSettings struct {
	Active bool   `json:"active"`
	Role   string `json:"role" validate:"required,oneof=Admin SuperAdmin Doctor"`
}

type UserCreate struct {
	UserName string `json:"username" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
	Role     string `json:"role" validate:"required,oneof=User SuperAdmin Doctor"`
}

type User struct {
	ID       string   `json:"id" db:"id"`
	Email    string   `json:"email" db:"email"`
	Password password `json:"-" db:"password"`
	Role     string   `json:"role" db:"role"`
	Active   bool     `json:"active" db:"active"`
}

type UserList struct {
	ID       string `json:"id" db:"id"`
	UserName string `json:"username" db:"username"`
	Role     string `json:"role" db:"role"`
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

// Scan implements the Scanner interface for database scanning
func (p *password) Scan(value interface{}) error {
	if value == nil {
		return nil
	}

	switch v := value.(type) {
	case string:
		p.Hash = []byte(v)
		return nil
	case []byte:
		p.Hash = v
		return nil
	default:
		return fmt.Errorf("cannot scan %T into password", value)
	}
}

// Value implements the Valuer interface for database storage
func (p password) Value() (driver.Value, error) {
	return string(p.Hash), nil
}
