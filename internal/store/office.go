package store

import (
	"context"
	"database/sql"

	"github.com/velenac/ordination/internal/models"
)

type OfficesRepository struct{}

func NewOfficesRepository() *OfficesRepository {
	return &OfficesRepository{}
}

func (r *OfficesRepository) GetList(ctx context.Context, q Querier) ([]*models.Office, error) {
	query := `SELECT 
				id, name, description 
				FROM offices ORDER BY created_at DESC`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	offices := []*models.Office{}
	for rows.Next() {
		office := &models.Office{}
		if err := rows.Scan(
			&office.ID,
			&office.Name,
			&office.Description); err != nil {
			return nil, err
		}
		offices = append(offices, office)
	}

	return offices, nil
}

func (r *OfficesRepository) GetByID(ctx context.Context, q Querier, id string) (*models.Office, error) {
	query := `SELECT 
				id, name, description 
				FROM offices WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	office := &models.Office{}
	if err := q.QueryRowContext(ctx, query, id).Scan(
		&office.ID,
		&office.Name,
		&office.Description); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return office, nil
}

func (r *OfficesRepository) Create(ctx context.Context, q Querier, office *models.Office) error {
	query := `INSERT INTO offices (name, description) VALUES ($1, $2) RETURNING id`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	createdOffice := &models.Office{}
	if err := q.QueryRowContext(ctx, query, office.Name, office.Description).Scan(&createdOffice.ID); err != nil {
		if err == sql.ErrNoRows {
			return ErrNotFound
		}
		return err
	}

	return nil
}

func (r *OfficesRepository) Update(ctx context.Context, q Querier, id string, office *models.Office) error {
	query := `UPDATE offices SET name = $1, description = $2 WHERE id = $3`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	if _, err := q.ExecContext(ctx, query, office.Name, office.Description, id); err != nil {
		if err == sql.ErrNoRows {
			return ErrNotFound
		}
		return err
	}

	return nil
}

func (r *OfficesRepository) Delete(ctx context.Context, q Querier, id string) error {
	query := `DELETE FROM offices WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	if _, err := q.ExecContext(ctx, query, id); err != nil {
		if err == sql.ErrNoRows {
			return ErrNotFound
		}
		return err
	}

	return nil
}

func (r *OfficesRepository) IsExists(ctx context.Context, q Querier, id string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM offices WHERE id = $1)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var exist bool
	err := q.QueryRowContext(ctx, query, id).Scan(&exist)
	if err != nil {
		return false, err
	}

	return exist, nil
}
