package models

type SignInPayload struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

type OpenSuperAdminPayload struct {
	Email    string `json:"email" validate:"required,email"`
	FullName string `json:"fullName" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`
}
