package store

import (
	"context"
	"database/sql"

	"github.com/velenac/ordination/internal/models"
)

type RolesRepository struct {
	store *Store
}

func NewRolesRepository(store *Store) *RolesRepository {
	return &RolesRepository{store: store}
}

func (r *RolesRepository) GetList(c context.Context, q Querier) ([]models.Role, error) {
	query := `SELECT id, name FROM roles`

	ctx, cancel := context.WithTimeout(c, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var roles []models.Role
	for rows.Next() {
		role := models.Role{}
		if err := rows.Scan(&role.ID, &role.Name); err != nil {
			return nil, err
		}
		roles = append(roles, role)
	}

	return roles, nil
}

func (r *RolesRepository) GetByName(c context.Context, q Querier, name string) (*models.Role, error) {
	query := `SELECT id, name FROM roles WHERE name = $1`

	ctx, cancel := context.WithTimeout(c, QueryTimeoutDuration)
	defer cancel()

	role := &models.Role{}
	if err := q.QueryRowContext(ctx, query, name).Scan(&role.ID, &role.Name); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return role, nil
}
