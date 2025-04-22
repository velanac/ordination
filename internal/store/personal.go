package store

import (
	"context"
	"database/sql"

	"github.com/velenac/ordination/internal/models"
)

type PersonalRepository struct{}

func NewPersonalRepository() *PersonalRepository {
	return &PersonalRepository{}
}

func (r *PersonalRepository) GetPersonalByUserId(ctx context.Context, q Querier, userId string) (*models.Personal, error) {
	query := `SELECT user_id, titles, first_name, last_name, phone, address, city, state, country, postal_code FROM personal WHERE user_id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	row := q.QueryRowContext(ctx, query, userId)

	personal := &models.Personal{}
	if err := row.Scan(&personal.UserId, &personal.Titles, &personal.FirstName, &personal.LastName, &personal.Phone,
		&personal.Address, &personal.City, &personal.State, &personal.Country,
		&personal.PostalCode); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return personal, nil
}

func (r *PersonalRepository) CreatePersonal(ctx context.Context, q Querier, personal *models.Personal) error {
	query := `INSERT INTO personal 
				(titles, user_id, first_name, last_name, phone, address, city, state, country, postal_code) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query,
		personal.Titles,
		personal.UserId,
		personal.FirstName,
		personal.LastName,
		personal.Phone,
		personal.Address,
		personal.City,
		personal.State,
		personal.Country,
		personal.PostalCode)

	if err != nil {
		return err
	}

	return nil
}

func (r *PersonalRepository) UpdatePersonal(ctx context.Context, q Querier, personal *models.Personal) error {
	query := `UPDATE personal SET titles=$1, first_name = $2, last_name = $3, phone = $4, address = $5, city = $6, state = $7, country = $8, postal_code = $9 WHERE user_id = $10`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query,
		personal.Titles,
		personal.FirstName,
		personal.LastName,
		personal.Phone,
		personal.Address,
		personal.City,
		personal.State,
		personal.Country,
		personal.PostalCode,
		personal.UserId)

	if err != nil {
		return err
	}

	return nil
}
