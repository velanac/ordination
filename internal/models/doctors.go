package models

type Doctor struct {
	ID          string `json:"id" db:"user_id"`
	Description string `json:"description" db:"description"`
}
