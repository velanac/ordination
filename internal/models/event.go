package models

type Event struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	PatientID string `json:"patient_id"`
	OfficeID  string `json:"office_id"`
	Title     string `json:"title"`
	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`
	Type      string `json:"type"`
}

type DoctorEventPayload struct {
	UserID    string `json:"user_id"`
	OfficeID  string `json:"office_id"`
	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`
}

type PatientEventPayload struct {
	PatientID string `json:"patient_id"`
	OfficeID  string `json:"office_id"`
	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`
}
