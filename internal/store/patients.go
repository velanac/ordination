package store

import (
	"context"
	"log"

	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/velenac/ordiora/internal/models"
)

type PatientsRepository struct{}

func NewPatientsRepository() *PatientsRepository {
	return &PatientsRepository{}
}

func (r *PatientsRepository) GetList(ctx context.Context, q Querier) ([]*models.PatientListItem, error) {
	query := `SELECT 
				id, first_name || ' ' || parent_name || ' ' || last_name AS full_name, address, email, city, created_at 
				FROM patients ORDER BY created_at DESC`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	patients := []*models.PatientListItem{}
	err = pgxscan.ScanAll(&patients, rows)
	if err != nil {
		log.Printf("Error scanning patients: %v", err)
		return nil, err
	}

	return patients, nil
}

func (r *PatientsRepository) GetByID(ctx context.Context, q Querier, id string) (*models.Patient, error) {
	query := `SELECT 
			id, first_name, parent_name, last_name, gender, date_of_birth, email, phone, address, city, country
			FROM patients WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.Query(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	patient := &models.Patient{}

	err = pgxscan.ScanOne(patient, rows)
	if err != nil {
		if pgxscan.NotFound(err) {
			return nil, ErrNotFound
		}

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

	err := q.QueryRow(ctx, query,
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

	_, err := q.Exec(ctx, query,
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

	commandTag, err := q.Exec(ctx, query, id)
	if err != nil {
		return err
	}

	if commandTag.RowsAffected() == 0 {
		return ErrNotFound
	}

	return nil
}

func (r *PatientsRepository) IsExists(ctx context.Context, q Querier, id string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM patients WHERE id = $1)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var exist bool
	err := q.QueryRow(ctx, query, id).Scan(&exist)
	if err != nil {
		return false, err
	}

	return exist, nil
}
