package store

import "database/sql"

type UserStorage struct {
	db *sql.DB
}

func (s *UserStorage) IsSuperAdminOpen() (bool, error) {
	query := `SELECT COUNT(*) FROM users 
				LEFT JOIN roles ON users.role_id = roles.id 
				WHERE roles.name = 'SuperAdmin'`

	row := s.db.QueryRow(query)

	var count int
	if err := row.Scan(&count); err != nil {
		return false, err
	}

	return count > 0, nil
}
