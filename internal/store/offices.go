package store

import (
	"context"

	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/jackc/pgx/v5"
	"github.com/velenac/ordiora/internal/models"
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

	rows, err := q.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var offices []*models.Office
	if err := pgxscan.ScanAll(&offices, rows); err != nil {
		return nil, err
	}

	return offices, nil
}

func (r *OfficesRepository) GetByID(ctx context.Context, q Querier, id string) (*models.Office, error) {
	query := `SELECT 
				id, name, description 
				FROM offices WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.Query(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var office models.Office
	if err := pgxscan.ScanOne(&office, rows); err != nil {
		if pgxscan.NotFound(err) {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return &office, nil
}

func (r *OfficesRepository) Create(ctx context.Context, q Querier, office *models.Office) error {
	query := `INSERT INTO offices (name, description) VALUES ($1, $2) RETURNING id`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var createdID string
	if err := q.QueryRow(ctx, query, office.Name, office.Description).Scan(&createdID); err != nil {
		if err == pgx.ErrNoRows {
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

	_, err := q.Exec(ctx, query, office.Name, office.Description, id)
	return err
}

func (r *OfficesRepository) Delete(ctx context.Context, q Querier, id string) error {
	query := `DELETE FROM offices WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query, id)
	return err
}

func (r *OfficesRepository) IsExists(ctx context.Context, q Querier, id string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM offices WHERE id = $1)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var exist bool
	err := q.QueryRow(ctx, query, id).Scan(&exist)
	if err != nil {
		return false, err
	}

	return exist, nil
}
