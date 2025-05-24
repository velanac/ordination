package models

type ServicePayload struct {
	Description string `json:"description" validate:"required"`
	Price       int64  `json:"price"`
}

type Service struct {
	ID          string `json:"id"`
	Description string `json:"description"`
	Price       int64  `json:"price"`
}
