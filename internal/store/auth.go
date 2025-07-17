package store

import (
	"context"
	"log"
	"time"

	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/velenac/ordiora/internal/models"
)

type AuthRepository struct{}

func NewAuthRepository() *AuthRepository {
	return &AuthRepository{}
}

func (r *AuthRepository) GetUserByEmail(c context.Context, q Querier, email string) (*models.User, error) {
	query := `SELECT users.id AS id, email, password, roles.name AS role FROM users 
			JOIN roles ON users.role_id = roles.id WHERE email = $1`

	ctx, cancel := context.WithTimeout(c, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.Query(ctx, query, email)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var user models.User
	err = pgxscan.ScanOne(&user, rows)
	if err != nil {
		log.Printf("Error scanning user: %v", err)
		if pgxscan.NotFound(err) {
			return nil, ErrNotFound // User not found
		}
		return nil, err // Other error
	}

	return &user, nil
}

func (r *AuthRepository) IsSuperAdminOpen(c context.Context, q Querier) (bool, error) {
	query := `SELECT COUNT(*) FROM users 
				LEFT JOIN roles ON users.role_id = roles.id 
				WHERE roles.name = 'SuperAdmin'`

	ctx, cancel := context.WithTimeout(c, QueryTimeoutDuration)
	defer cancel()

	row := q.QueryRow(ctx, query)

	var count int
	if err := row.Scan(&count); err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *AuthRepository) OpenSuperAdmin(ctx context.Context, q Querier, user *models.User) error {
	query := `INSERT INTO users (email, password, email_verified, role_id) VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name = 'SuperAdmin'))`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query, user.Email, user.Password.Hash, time.Now())
	if err != nil {
		return err
	}

	return nil
}
