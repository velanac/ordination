package store

import (
	"context"
	"database/sql"

	"github.com/velenac/ordination/internal/models"
)

type ServicesRepository struct{}

func NewServicesRepository() *ServicesRepository {
	return &ServicesRepository{}
}

func (r *ServicesRepository) GetAll(ctx context.Context, q Querier) ([]models.Service, error) {
	query := `SELECT
				id, description, price FROM services ORDER BY created_at DESC`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	services := []models.Service{}
	for rows.Next() {
		service := models.Service{}
		if err := rows.Scan(
			&service.ID,
			&service.Description,
			&service.Price); err != nil {
			return nil, err
		}
		services = append(services, service)
	}

	return services, nil
}

func (r *ServicesRepository) GetByID(ctx context.Context, q Querier, id string) (*models.Service, error) {
	query := `SELECT
				id, description, price FROM services WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	service := &models.Service{}
	if err := q.QueryRowContext(ctx, query, id).Scan(
		&service.ID,
		&service.Description,
		&service.Price); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return service, nil
}

func (r *ServicesRepository) Create(ctx context.Context, q Querier, payload models.ServicePayload) error {
	query := `INSERT INTO services (description, price) 
				VALUES ($1, $2) RETURNING id`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	service := &models.Service{}
	if err := q.QueryRowContext(ctx, query,
		payload.Description,
		payload.Price).Scan(
		&service.ID); err != nil {
		return err
	}

	return nil
}

func (r *ServicesRepository) Update(ctx context.Context, q Querier, id string, payload models.ServicePayload) error {
	query := `UPDATE services SET description = $1, price = $2 WHERE id = $3`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	if _, err := q.ExecContext(ctx, query,
		payload.Description,
		payload.Price,
		id); err != nil {
		if err == sql.ErrNoRows {
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

	if _, err := q.ExecContext(ctx, query, id); err != nil {
		if err == sql.ErrNoRows {
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
	err := q.QueryRowContext(ctx, query, id).Scan(&exist)
	if err != nil {
		return false, err
	}

	return exist, nil
}
