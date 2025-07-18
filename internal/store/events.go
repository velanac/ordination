package store

import (
	"context"
	"database/sql"

	"github.com/georgysavva/scany/v2/pgxscan"
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

	rows, err := q.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var events []*models.Event
	if err := pgxscan.ScanAll(&events, rows); err != nil {
		return nil, err
	}

	return events, nil
}

// GetRecentEvents
func (r *EventsRepository) GetRecentAndUpcomingOfficesEvents(ctx context.Context, q Querier) ([]*models.OfficeWithEvents, error) {
	query := `
		SELECT 
			o.id, o.name, o.description,
			e.id AS event_id, e.title, e.start_time, e.end_time, e.type, e.office_id, e.user_id, e.patient_id
		FROM offices o
		LEFT JOIN events e 
			ON o.id = e.office_id 
			AND e.start_time >= NOW() - INTERVAL '24 hours'
		ORDER BY o.created_at, e.start_time
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := q.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	offices := make(map[string]*models.OfficeWithEvents)
	for rows.Next() {
		var (
			officeID, officeName, officeDescription                                    sql.NullString
			eventID, eventTitle, eventType, eventOfficeID, eventUserID, eventPatientID sql.NullString
			eventStartTime, eventEndTime                                               sql.NullTime
		)

		if err := rows.Scan(
			&officeID, &officeName, &officeDescription,
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
				Events:      []models.OfficeEvent{},
			}
		}

		// Only add event if it exists (LEFT JOIN may return NULLs)
		if eventID.Valid {
			event := models.OfficeEvent{
				ID:        eventID.String,
				Title:     eventTitle.String,
				StartTime: eventStartTime.Time,
				EndTime:   eventEndTime.Time,
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

	rows, err := q.Query(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	event := models.Event{}
	err = pgxscan.ScanOne(&event, rows)

	if err != nil {
		if pgxscan.NotFound(err) {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return &event, nil
}

// Create inserts a new doctor event into the database.
func (r *EventsRepository) CreateDoctorEvent(ctx context.Context, q Querier, event *models.Event) error {
	query := `INSERT INTO events (user_id, office_id, title, start_time, end_time, type)
			VALUES ($1, $2, $3, $4, $5, $6)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query,
		event.UserID,
		event.OfficeID,
		event.Title,
		event.StartTime,
		event.EndTime,
		event.Type)

	return err
}

// CreatePatientEvent inserts a new patient event into the database.
func (r *EventsRepository) CreatePatientEvent(ctx context.Context, q Querier, event *models.Event) error {
	query := `INSERT INTO events (patient_id, office_id, user_id, title, start_time, end_time, type)
			VALUES ($1, $2, $3, $4, $5, $6, $7)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query,
		event.PatientID,
		event.OfficeID,
		event.UserID,
		event.Title,
		event.StartTime,
		event.EndTime,
		event.Type)

	return err
}

// Update modifies an existing event in the database.
func (r *EventsRepository) Update(ctx context.Context, q Querier, event *models.Event) error {
	query := `UPDATE events 
			SET user_id = $1, office_id = $2, title = $3, start_time = $4, end_time = $5
			WHERE id = $6`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := q.Exec(ctx, query,
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

	commandTag, err := q.Exec(ctx, query, id)
	if err != nil {
		return err
	}

	if commandTag.RowsAffected() == 0 {
		return ErrNotFound
	}

	return nil
}

// IsExists checks if an event with the given ID exists in the database.
func (r *EventsRepository) IsExists(ctx context.Context, q Querier, id string) (bool, error) {
	query := `SELECT COUNT(*) FROM events WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var count int
	if err := q.QueryRow(ctx, query, id).Scan(&count); err != nil {
		return false, err
	}

	return count > 0, nil
}
