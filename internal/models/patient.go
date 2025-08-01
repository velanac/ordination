package models

import "time"

type PatientPayload struct {
	FirstName   string    `json:"firstName" validate:"required"`
	ParentName  string    `json:"parentName"`
	LastName    string    `json:"lastName" validate:"required"`
	Gender      string    `json:"gender"`
	DateOfBirth time.Time `json:"dateOfBirth"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
	Address     string    `json:"address"`
	City        string    `json:"city"`
	Country     string    `json:"country"`
}

func (p *PatientPayload) GetPatient() *Patient {
	return &Patient{
		FirstName:   p.FirstName,
		ParentName:  p.ParentName,
		LastName:    p.LastName,
		Gender:      p.Gender,
		DateOfBirth: p.DateOfBirth,
		Email:       p.Email,
		Phone:       p.Phone,
		Address:     p.Address,
		City:        p.City,
		Country:     p.Country,
	}
}

type PatientListItem struct {
	ID        string    `json:"id"`
	FullName  string    `json:"fullName"`
	Address   string    `json:"address"`
	Email     string    `json:"email"`
	City      string    `json:"city"`
	CreatedAt time.Time `json:"createdAt"`
}

type Patient struct {
	ID          string    `json:"id"`
	FirstName   string    `json:"firstName"`
	ParentName  string    `json:"parentName"`
	LastName    string    `json:"lastName"`
	Gender      string    `json:"gender"`
	DateOfBirth time.Time `json:"dateOfBirth"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
	Address     string    `json:"address"`
	City        string    `json:"city"`
	Country     string    `json:"country"`
	CreatedAt   string    `json:"createdAt"`
}
