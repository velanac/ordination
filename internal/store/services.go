package store

import (
	"context"

	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/jackc/pgx/v5"
	"github.com/velenac/ordiora/internal/models"
)

type ServicesRepository struct{}

func NewServicesRepository() *ServicesRepository {
	return &ServicesRepository{}
}

func (r *ServicesRepository) GetAll(ctx context.Context, q Querier) ([]*models.Service, error) {
	query := `SELECT
				id, description, price FROM services ORDER BY created_at DESC`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	services := []*models.Service{}
	pgxscan.ScanAll(&services, rows)

	return services, nil
}

func (r *ServicesRepository) GetByID(ctx context.Context, q Querier, id string) (*models.Service, error) {
	query := `SELECT
				id, description, price FROM services WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	service := &models.Service{}
	if err := q.QueryRow(ctx, query, id).Scan(
		&service.ID,
		&service.Description,
		&service.Price); err != nil {
		if err == pgx.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return service, nil
}

func (r *ServicesRepository) Create(ctx context.Context, q Querier, payload *models.Service) error {
	query := `INSERT INTO services (description, price) 
				VALUES ($1, $2) RETURNING id`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	service := &models.Service{}
	if err := q.QueryRow(ctx, query,
		payload.Description,
		payload.Price).Scan(
		&service.ID); err != nil {
		return err
	}

	return nil
}

func (r *ServicesRepository) Update(ctx context.Context, q Querier, id string, payload *models.Service) error {
	query := `UPDATE services SET description = $1, price = $2 WHERE id = $3`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	if _, err := q.Exec(ctx, query,
		payload.Description,
		payload.Price,
		id); err != nil {
		if err == pgx.ErrNoRows {
			return ErrNotFound
		}
		return err
	}

	return nil
}

func (r *ServicesRepository) Delete(ctx context.Context, q Querier, id string) error {
	query := `DELETE FROM services WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	if _, err := q.Exec(ctx, query, id); err != nil {
		if err == pgx.ErrNoRows {
			return ErrNotFound
		}
		return err
	}

	return nil
}

func (r *ServicesRepository) IsExists(ctx context.Context, q Querier, id string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM services WHERE id = $1)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var exist bool
	err := q.QueryRow(ctx, query, id).Scan(&exist)
	if err != nil {
		return false, err
	}

	return exist, nil
}
