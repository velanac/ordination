package store

import (
	"context"
	"database/sql"

	"github.com/velenac/ordiora/internal/models"
)

type EventsRepository struct{}

func NewEventsRepository() *EventsRepository {
	return &EventsRepository{}
}

// GetRecentAndUpcomingEvents retrieves a list of events that occurred in the last 24 hours.
func (r *EventsRepository) GetRecentAndUpcomingEvents(ctx context.Context, q Querier) ([]*models.Event, error) {
	query := `SELECT
					id, title, start_time, end_time, type, 
					office_id, user_id, patient_id
					FROM events
					WHERE start_time >= NOW() - INTERVAL '24 hours'
					ORDER BY events.start_time`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.QueryContext(ctx, query)
	if err != nil {
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

// GetRecentEvents
func (r *EventsRepository) GetRecentAndUpcomingOfficesEvents(ctx context.Context, q Querier) ([]*models.OfficeWithEvents, error) {
	query := `
		SELECT 
			o.id, o.name, o.description, o.created_at,
			e.id, e.title, e.start_time, e.end_time, e.type, e.office_id, e.user_id, e.patient_id
		FROM offices o
		LEFT JOIN events e 
			ON o.id = e.office_id 
			AND e.type = 'doctor' 
			AND e.start_time >= NOW() - INTERVAL '24 hours'
		ORDER BY o.created_at, e.start_time
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	offices := make(map[string]*models.OfficeWithEvents)
	for rows.Next() {
		var (
			officeID, officeName, officeDescription, officeCreatedAt                   sql.NullString
			eventID, eventTitle, eventType, eventOfficeID, eventUserID, eventPatientID sql.NullString
			eventStartTime, eventEndTime                                               sql.NullTime
		)

		if err := rows.Scan(
			&officeID, &officeName, &officeDescription, &officeCreatedAt,
			&eventID, &eventTitle, &eventStartTime, &eventEndTime, &eventType, &eventOfficeID, &eventUserID, &eventPatientID,
		); err != nil {
			return nil, err
		}

		id := officeID.String
		if _, exists := offices[id]; !exists {
			offices[id] = &models.OfficeWithEvents{
				ID:          officeID.String,
				Name:        officeName.String,
				Description: officeDescription.String,
				Events:      []models.Event{},
			}
		}

		// Only add event if it exists (LEFT JOIN may return NULLs)
		if eventID.Valid {
			event := models.Event{
				ID:        eventID.String,
				Title:     eventTitle.String,
				StartTime: eventStartTime.Time.String(),
				EndTime:   eventEndTime.Time.String(),
				Type:      eventType.String,
				OfficeID:  eventOfficeID.String,
				UserID:    eventUserID.String,
				PatientID: eventPatientID.String,
			}
			offices[id].Events = append(offices[id].Events, event)
		}
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	// Convert map to slice
	officeList := make([]*models.OfficeWithEvents, 0, len(offices))
	for _, office := range offices {
		officeList = append(officeList, office)
	}

	return officeList, nil
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

// Create inserts a new doctor event into the database.
func (r *EventsRepository) CreateDoctorEvent(ctx context.Context, q Querier, event *models.Event) error {
	query := `INSERT INTO events (user_id, office_id, title, start_time, end_time, type)
			VALUES ($1, $2, $3, $4, $5, $6)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query,
		event.UserID,
		event.OfficeID,
		event.Title,
		event.StartTime,
		event.EndTime,
		event.Type)

	if err != nil {
		if err == sql.ErrNoRows {
			return ErrNotFound
		}

		return err
	}

	return nil
}

// CreatePatientEvent inserts a new patient event into the database.
func (r *EventsRepository) CreatePatientEvent(ctx context.Context, q Querier, event *models.Event) error {
	query := `INSERT INTO events (patient_id, office_id, user_id, title, start_time, end_time, type)
			VALUES ($1, $2, $3, $4, $5, $6, $7)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query,
		event.PatientID,
		event.OfficeID,
		event.UserID,
		event.Title,
		event.StartTime,
		event.EndTime,
		event.Type)

	if err != nil {
		if err == sql.ErrNoRows {
			return ErrNotFound
		}
	}

	return err
}

// Update modifies an existing event in the database.
func (r *EventsRepository) Update(ctx context.Context, q Querier, event *models.Event) error {
	query := `UPDATE events 
			SET user_id = $1, office_id = $2, title = $3, start_time = $4, end_time = $5
			WHERE id = $6`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.ExecContext(ctx, query,
		event.UserID,
		event.OfficeID,
		event.Title,
		event.StartTime,
		event.EndTime,
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
