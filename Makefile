include .env

.PHONY: migration migrate-up migrate-down migrate-status migrate-reset migrate-version

# Creating a new migration: make migration name=migration_name
migration:
	@echo "Creating new migration: $(name)"
	@goose create "$(name)" sql

# Applying all available migrations
migrate-up:
	@echo "Applying all up migrations..."
	@goose up

# Reverting one migration
migrate-down:
	@echo "Reverting one migration..."
	@goose down

# Status of all migrations
migrate-status:
	@goose status

# Resetting the database: all migrations down and then up
migrate-reset:
	@echo "Resetting database..."
	@goose reset

# Current database version
migrate-version:
	@goose version