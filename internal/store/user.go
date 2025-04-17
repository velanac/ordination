package store

import (
	"context"
	"database/sql"
	"time"

	"github.com/velenac/ordination/internal/models"
)

type UsersRepository interface {
	OpenSuperAdmin(c context.Context, user *models.User) error
	GetUserByEmail(c context.Context, email string) (*models.User, error)
}

type usersRepository struct {
	db *sql.DB
}

func NewUsersRepository(db *sql.DB) UsersRepository {
	return &usersRepository{db: db}
}

func (r *usersRepository) OpenSuperAdmin(ctx context.Context, user *models.User) error {
	query := `INSERT INTO users (email, full_name, password, email_verified, role_id) VALUES ($1, $2, $3, $4, (SELECT id FROM roles WHERE name = 'SuperAdmin'))`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := r.db.ExecContext(ctx, query, user.Email, user.FullName, user.Password.Hash, time.Now())
	if err != nil {
		return err
	}

	return nil
}

func (r *usersRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	query := `SELECT u.id, u.email, u.full_name, u.password, r.name FROM users u 
				JOIN roles r on u.role_id = r.id
				WHERE email = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	row := r.db.QueryRowContext(ctx, query, email)

	user := &models.User{}
	if err := row.Scan(&user.ID, &user.Email, &user.FullName, &user.Password.Hash, &user.Role); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return user, nil
}
