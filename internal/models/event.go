package models

type Event struct {
	ID        string `json:"id"`
	UserID    string `json:"userId"`
	PatientID string `json:"patientId"`
	OfficeID  string `json:"officeId"`
	Title     string `json:"title"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
	Type      string `json:"type"`
}

type DoctorEventPayload struct {
	UserID    string `json:"userId"`
	OfficeID  string `json:"officeId"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
}

type PatientEventPayload struct {
	PatientID string `json:"patientId"`
	UserID    string `json:"userId"`
	OfficeID  string `json:"officeId"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
}
