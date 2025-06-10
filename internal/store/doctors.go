package store

import (
	"context"

	"github.com/velenac/ordination/internal/models"
)

type DoctorsRepository struct{}

func NewDoctorsRepository() *DoctorsRepository {
	return &DoctorsRepository{}
}

func (r *DoctorsRepository) GetList(ctx context.Context, q Querier) ([]*models.Doctor, error) {
	query := `SELECT p.user_id, CONCAT(p.titles, ' ',p.first_name, ' ', p.last_name) AS description FORM users u
				LEFT JOIN role r ON  r.id = u.role_id
				LEFT JOIN profiles p ON p.user_id = u.id
				WHERE r.type = 'doctor' ORDER BY p.description`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var doctors []*models.Doctor
	for rows.Next() {
		doctor := &models.Doctor{}
		if err := rows.Scan(&doctor.ID, &doctor.Description); err != nil {
			return nil, err
		}
		doctors = append(doctors, doctor)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return doctors, nil
}
