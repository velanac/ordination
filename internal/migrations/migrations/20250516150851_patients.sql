-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(254),
    phone VARCHAR(254),
    address TEXT,
    city TEXT,
    country TEXT,
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS patients;
-- +goose StatementEnd
