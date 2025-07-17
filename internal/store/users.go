package store

import (
	"context"
	"time"

	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/velenac/ordiora/internal/models"
)

type UsersRepository struct{}

func NewUsersRepository() *UsersRepository {
	return &UsersRepository{}
}

func (r *UsersRepository) GetList(ctx context.Context, q Querier) ([]*models.UserList, error) {
	query := `SELECT u.id, u.email AS username, r.name AS role FROM users u 
				JOIN roles r on u.role_id = r.id
				ORDER BY u.created_at DESC`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []*models.UserList
	if err := pgxscan.ScanAll(&users, rows); err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UsersRepository) GetByID(ctx context.Context, q Querier, id string) (*models.User, error) {
	query := `SELECT u.id, u.email, u.active, r.name AS role FROM users u 
				JOIN roles r on u.role_id = r.id
				WHERE u.id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.Query(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var user models.User
	if err := pgxscan.ScanOne(&user, rows); err != nil {
		if pgxscan.NotFound(err) {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return &user, nil
}

func (r *UsersRepository) Create(ctx context.Context, q Querier, user *models.User) error {
	query := `INSERT INTO users (email, password, email_verified, role_id) 
				VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name = $4))`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query, user.Email, user.Password.Hash, time.Now(), user.Role)
	if err != nil {
		return err
	}

	return nil
}

func (r *UsersRepository) OpenSuperAdmin(ctx context.Context, q Querier, user *models.User) error {
	query := `INSERT INTO users (email, password, email_verified, role_id) VALUES ($1, $2, $3, $4, (SELECT id FROM roles WHERE name = 'SuperAdmin'))`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query, user.Email, user.Password.Hash, time.Now())
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

	rows, err := q.Query(ctx, query, email)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var user models.User
	err = pgxscan.ScanOne(&user, rows)
	if err != nil {
		if pgxscan.NotFound(err) {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return &user, nil
}

func (r *UsersRepository) Delete(ctx context.Context, q Querier, id string) error {
	query := `DELETE FROM users WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query, id)
	if err != nil {
		return err
	}

	return nil
}

func (r *UsersRepository) ChangeActiveStatus(ctx context.Context, q Querier, status bool, id string) error {
	query := `UPDATE users SET active = $1 WHERE id = $2`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query, status, id)
	if err != nil {
		return err
	}

	return nil
}

func (r *UsersRepository) UpdateGeneralSettings(ctx context.Context, q Querier, user *models.User) error {
	query := `UPDATE users SET active = $1, role_id = (SELECT id FROM roles WHERE name = $2) WHERE id = $3`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query, user.Active, user.Role, user.ID)
	if err != nil {
		return err
	}

	return nil
}
