package models

type PatientPayload struct {
	FullName    string `json:"fullName" validate:"required"`
	Gender      string `json:"gender" validate:"required"`
	DateOfBirth string `json:"dateOfBirth" validate:"required"`
	Email       string `json:"email" validate:"required,email"`
	Phone       string `json:"phone" validate:"required"`
	Address     string `json:"address" validate:"required"`
	City        string `json:"city" validate:"required"`
	Country     string `json:"country" validate:"required"`
}

type Patient struct {
	ID          string `json:"id"`
	FullName    string `json:"fullName"`
	Gender      string `json:"gender"`
	DateOfBirth string `json:"dateOfBirth"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Address     string `json:"address"`
	City        string `json:"city"`
	Country     string `json:"country"`
}
