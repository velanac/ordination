package store

import (
	"context"
	"database/sql"
	"time"

	"github.com/velenac/ordination/internal/models"
)

type AuthRepository interface {
	GetUserByEmail(c context.Context, email string) (*models.User, error)
	IsSuperAdminOpen(c context.Context) (bool, error)
	OpenSuperAdmin(c context.Context, user *models.User) error
}

type authRepository struct {
	db *sql.DB
}

func NewAuthRepository(db *sql.DB) AuthRepository {
	return &authRepository{
		db: db,
	}
}

func (r *authRepository) GetUserByEmail(c context.Context, email string) (*models.User, error) {
	query := `SELECT users.id, email, password, roles.name FROM users 
			JOIN roles ON users.role_id = roles.id WHERE email = $1`

	ctx, cancel := context.WithTimeout(c, QueryTimeoutDuration)
	defer cancel()

	row := r.db.QueryRowContext(ctx, query, email)

	user := &models.User{}
	if err := row.Scan(&user.ID, &user.Email, &user.Password.Hash, &user.Role); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // User not found
		}
		return nil, err // Other error
	}

	return user, nil
}

func (r *authRepository) IsSuperAdminOpen(c context.Context) (bool, error) {
	query := `SELECT COUNT(*) FROM users 
				LEFT JOIN roles ON users.role_id = roles.id 
				WHERE roles.name = 'SuperAdmin'`

	ctx, cancel := context.WithTimeout(c, QueryTimeoutDuration)
	defer cancel()

	row := r.db.QueryRowContext(ctx, query)

	var count int
	if err := row.Scan(&count); err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *authRepository) OpenSuperAdmin(ctx context.Context, user *models.User) error {
	query := `INSERT INTO users (email, full_name, password, email_verified, role_id) VALUES ($1, $2, $3, $4, (SELECT id FROM roles WHERE name = 'SuperAdmin'))`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := r.db.ExecContext(ctx, query, user.Email, user.FullName, user.Password.Hash, time.Now())
	if err != nil {
		return err
	}

	return nil
}
