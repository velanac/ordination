package store

import (
	"context"
	"database/sql"
	"time"

	"github.com/velenac/ordination/internal/models"
)

type UsersRepository struct{}

func NewUsersRepository() *UsersRepository {
	return &UsersRepository{}
}

func (r *UsersRepository) OpenSuperAdmin(ctx context.Context, q Querier, user *models.User) error {
	query := `INSERT INTO users (email, password, email_verified, role_id) VALUES ($1, $2, $3, $4, (SELECT id FROM roles WHERE name = 'SuperAdmin'))`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query, user.Email, user.Password.Hash, time.Now())
	if err != nil {
		return err
	}

	return nil
}

func (r *UsersRepository) GetUserByEmail(ctx context.Context, q Querier, email string) (*models.User, error) {
	query := `SELECT u.id, u.email, u.password, r.name FROM users u 
				JOIN roles r on u.role_id = r.id
				WHERE email = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	row := q.QueryRowContext(ctx, query, email)

	user := &models.User{}
	if err := row.Scan(&user.ID, &user.Email, &user.Password.Hash, &user.Role); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return user, nil
}
