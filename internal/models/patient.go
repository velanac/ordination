package models

type PatientPayload struct {
	FirstName   string `json:"firstName" validate:"required"`
	ParentName  string `json:"parentName"`
	LastName    string `json:"lastName" validate:"required"`
	Gender      string `json:"gender"`
	DateOfBirth string `json:"dateOfBirth"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Address     string `json:"address"`
	City        string `json:"city"`
	Country     string `json:"country"`
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

type Patient struct {
	ID          string `json:"id"`
	FirstName   string `json:"firstName"`
	ParentName  string `json:"parentName"`
	LastName    string `json:"lastName"`
	Gender      string `json:"gender"`
	DateOfBirth string `json:"dateOfBirth"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Address     string `json:"address"`
	City        string `json:"city"`
	Country     string `json:"country"`
}
