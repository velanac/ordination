package store

import (
	"context"
	"database/sql"
	"errors"

	"github.com/velenac/ordination/internal/models"
)

type PatientsRepository struct{}

func NewPatientsRepository() *PatientsRepository {
	return &PatientsRepository{}
}

func (r *PatientsRepository) GetList(ctx context.Context, q Querier) ([]*models.Patient, error) {
	query := `SELECT 
				id, first_name, parent_name, last_name, gender, date_of_birth, email, phone, address, city, country 
				FROM patients ORDER BY created_at DESC`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	patients := []*models.Patient{}
	for rows.Next() {
		patient := &models.Patient{}
		if err := rows.Scan(
			&patient.ID,
			&patient.FirstName,
			&patient.ParentName,
			&patient.LastName,
			&patient.Gender,
			&patient.DateOfBirth,
			&patient.Email,
			&patient.Phone,
			&patient.Address,
			&patient.City,
			&patient.Country); err != nil {
			return nil, err
		}
		patients = append(patients, patient)
	}

	return patients, nil
}

func (r *PatientsRepository) GetById(ctx context.Context, q Querier, id string) (*models.Patient, error) {
	query := `SELECT 
			id, first_name, parent_name, last_name, gender, date_of_birth, email, phone, address, city, country
			FROM patients WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	row := q.QueryRowContext(ctx, query, id)
	patient := &models.Patient{}
	if err := row.Scan(
		&patient.ID,
		&patient.FirstName,
		&patient.ParentName,
		&patient.LastName,
		&patient.Gender,
		&patient.DateOfBirth,
		&patient.Email,
		&patient.Phone,
		&patient.Address,
		&patient.City,
		&patient.Country); err != nil {

		return nil, err
	}

	return patient, nil
}

func (r *PatientsRepository) Create(ctx context.Context, q Querier, patient *models.Patient) error {
	query := `INSERT INTO 
				patients (first_name, parent_name, last_name, gender, date_of_birth, email, phone, address, city, country)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`
	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := q.QueryRowContext(ctx, query,
		patient.FirstName,
		patient.ParentName,
		patient.LastName,
		patient.Gender,
		patient.DateOfBirth,
		patient.Email,
		patient.Phone,
		patient.Address,
		patient.City,
		patient.Country,
	).Scan(&patient.ID)

	if err != nil {
		return err
	}

	return nil
}

func (r *PatientsRepository) Update(ctx context.Context, q Querier, patient *models.Patient, id string) error {
	query := `UPDATE patients SET 
				first_name = $1, parent_name = $2, last_name = $3, gender = $4, date_of_birth = $5, email = $6, 
				phone = $7, address = $8, city = $9, country = $10, updated_at = NOW() WHERE id = $11`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query,
		patient.FirstName,
		patient.ParentName,
		patient.LastName,
		patient.Gender,
		patient.DateOfBirth,
		patient.Email,
		patient.Phone,
		patient.Address,
		patient.City,
		patient.Country,
		id,
	)

	if err != nil {
		return err
	}

	return nil
}

func (r *PatientsRepository) Delete(ctx context.Context, q Querier, id string) error {
	query := `DELETE FROM patients WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query, id)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return ErrNotFound
		default:
			return err
		}
	}

	return nil
}

func (r *PatientsRepository) IsExists(ctx context.Context, q Querier, id string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM patients WHERE id = $1)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var exist bool
	err := q.QueryRowContext(ctx, query, id).Scan(&exist)
	if err != nil {
		return false, err
	}

	return exist, nil
}
