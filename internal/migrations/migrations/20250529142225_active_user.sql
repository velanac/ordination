-- +goose Up
-- +goose StatementBegin
ALTER TABLE users
ADD COLUMN active BOOLEAN NOT NULL DEFAULT TRUE;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE users
DROP COLUMN active;
-- +goose StatementEnd
