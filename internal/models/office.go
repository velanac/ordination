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
