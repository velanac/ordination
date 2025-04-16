package store

import (
	"context"
	"database/sql"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type UserStorage struct {
	db *sql.DB
}

type User struct {
	ID       string   `json:"id"`
	Email    string   `json:"email"`
	FullName string   `json:"full_name"`
	Password password `json:"-"`
}

type password struct {
	text *string
	hash []byte
}

func (p *password) Set(rawPassword string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(rawPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	p.text = &rawPassword
	p.hash = hash

	return nil
}

func (p *password) Compare(text string) error {
	return bcrypt.CompareHashAndPassword(p.hash, []byte(text))
}

func (s *UserStorage) IsSuperAdminOpen(ctx context.Context) (bool, error) {
	query := `SELECT COUNT(*) FROM users 
				LEFT JOIN roles ON users.role_id = roles.id 
				WHERE roles.name = 'SuperAdmin'`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	row := s.db.QueryRowContext(ctx, query)

	var count int
	if err := row.Scan(&count); err != nil {
		return false, err
	}

	return count > 0, nil
}

func (s *UserStorage) OpenSuperAdmin(ctx context.Context, user *User) error {
	query := `INSERT INTO users (email, full_name, password, email_verified, role_id) VALUES ($1, $2, $3, $4, (SELECT id FROM roles WHERE name = 'SuperAdmin'))`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := s.db.ExecContext(ctx, query, user.Email, user.FullName, user.Password.hash, time.Now())
	if err != nil {
		return err
	}

	return nil
}

func (s *UserStorage) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	query := `SELECT id, email, full_name, password FROM users WHERE email = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	row := s.db.QueryRowContext(ctx, query, email)

	user := &User{}
	if err := row.Scan(&user.ID, &user.Email, &user.FullName, &user.Password.hash); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return user, nil
}
