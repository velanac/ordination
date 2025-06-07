package store

import (
	"context"
	"database/sql"

	"github.com/velenac/ordination/internal/models"
)

type EventsRepository struct{}

func NewEventsRepository() *EventsRepository {
	return &EventsRepository{}
}

// GetRecentAndUpcomingEvents retrieves a list of events that occurred in the last 24 hours.
func (r *EventsRepository) GetRecentAndUpcomingEvents(ctx context.Context, q Querier) ([]*models.Event, error) {
	query := `SELECT
					id, title, start_time, end_time, type, office_id, user_id, patient_id
					FROM events 
					WHERE start_time >= NOW() - INTERVAL '24 hours'
					ORDER BY start_time`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.QueryContext(ctx, query)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}
	defer rows.Close()

	events := make([]*models.Event, 0)
	for rows.Next() {
		event := &models.Event{}
		if err := rows.Scan(
			&event.ID,
			&event.Title,
			&event.StartTime,
			&event.EndTime,
			&event.Type,
			&event.OfficeID,
			&event.UserID,
			&event.PatientID); err != nil {
			if err == sql.ErrNoRows {
				return nil, ErrNotFound
			}
			return nil, err
		}
		events = append(events, event)
	}
	if err := rows.Err(); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return events, nil
}

// GetByID retrieves an event by its ID.
func (r *EventsRepository) GetByID(ctx context.Context, q Querier, id string) (*models.Event, error) {
	query := `SELECT 
				id, title, start_time, end_time, type, office_id, user_id, patient_id 
				FROM events WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	event := &models.Event{}
	if err := q.QueryRowContext(ctx, query, id).Scan(
		&event.ID,
		&event.Title,
		&event.StartTime,
		&event.EndTime,
		&event.Type,
		&event.OfficeID,
		&event.UserID,
		&event.PatientID); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return event, nil
}

// Create inserts a new event into the database.
func (r *EventsRepository) Create(ctx context.Context, q Querier, event *models.Event) error {
	query := `INSERT INTO events (id, user_id, patient_id, office_id, title, start_time, end_time, type)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query,
		event.ID,
		event.UserID,
		event.PatientID,
		event.OfficeID,
		event.Title,
		event.StartTime,
		event.EndTime,
		event.Type)

	return err
}

// Update modifies an existing event in the database.
func (r *EventsRepository) Update(ctx context.Context, q Querier, event *models.Event) error {
	query := `UPDATE events 
			SET user_id = $1, patient_id = $2, office_id = $3, title = $4, start_time = $5, end_time = $6, type = $7
			WHERE id = $8`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query,
		event.UserID,
		event.PatientID,
		event.OfficeID,
		event.Title,
		event.StartTime,
		event.EndTime,
		event.Type,
		event.ID)

	return err
}

// Delete removes an event from the database by its ID.
func (r *EventsRepository) Delete(ctx context.Context, q Querier, id string) error {
	query := `DELETE FROM events WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return ErrNotFound
		}
		return err
	}

	return nil
}

// IsExists checks if an event with the given ID exists in the database.
func (r *EventsRepository) IsExists(ctx context.Context, q Querier, id string) (bool, error) {
	query := `SELECT COUNT(*) FROM events WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var count int
	if err := q.QueryRowContext(ctx, query, id).Scan(&count); err != nil {
		if err == sql.ErrNoRows {
			return false, ErrNotFound
		}
		return false, err
	}

	return count > 0, nil
}
