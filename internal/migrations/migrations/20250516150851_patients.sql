-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(254) NOT NULL,
    parent_name VARCHAR(254),
    last_name VARCHAR(254) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    date_of_birth TIMESTAMP WITH TIME ZONE,
    email VARCHAR(254),
    phone VARCHAR(254),
    address TEXT,
    city TEXT,
    country TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS patients;
-- +goose StatementEnd
