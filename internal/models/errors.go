package models

import (
	"errors"
	"time"
)

var (
	ErrSuperAdminAlreadyExists = errors.New("super admin already exists")
	ErrNotFound                = errors.New("resource not found")
	ErrConflict                = errors.New("resource conflict")
	QueryTimeoutDuration       = time.Second * 5 // 5 minutes
)
