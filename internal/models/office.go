package models

type OfficePayload struct {
	Name        string `json:"name" validate:"required,max=254"`
	Description string `json:"description"`
}

type Office struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type OfficeWithEvents struct {
	ID          string        `json:"id" db:"id"`
	Name        string        `json:"name" db:"office_name"`
	Description string        `json:"description" db:"description"`
	Events      []OfficeEvent `json:"events"`
}

type OfficeEvent struct {
	ID        string `json:"id" db:"event_id"`
	UserID    string `json:"userId" db:"user_id"`
	PatientID string `json:"patientId" db:"patient_id"`
	OfficeID  string `json:"officeId" db:"office_id"`
	Title     string `json:"title" db:"title"`
	StartTime string `json:"startTime" db:"start_time"`
	EndTime   string `json:"endTime" db:"end_time"`
	Type      string `json:"type" db:"type"`
}
