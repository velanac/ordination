package config

import (
	"log"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Addr        string
	DB          DbConfig
	AppEnv      string
	FrontendURL string
	Auth        AuthConfig
	FileStore   FileStoreConfig
}

type DbConfig struct {
	DbServer     string
	Catalog      string
	MaxOpenConns int
	MaxIdleConns int
	MaxIdleTime  string
}

type AuthConfig struct {
	Basic BasicConfig
	Token TokenConfig
}

type BasicConfig struct {
	User string
	Pass string
}

type TokenConfig struct {
	Secret string
	Exp    time.Duration
	Iss    string
}

type FileStoreConfig struct {
	BasePath string
}

func NewConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return &Config{
		Addr: GetString("SEVER_PORT", ":8080"),
		DB: DbConfig{
			DbServer:     GetString("DB_SERVER", "postgres://postgres:Predator170@localhost:5432/"),
			Catalog:      GetString("DB_CATALOG", "ordination"),
			MaxOpenConns: GetInt("DB_MAX_OPEN_CONNS", 30),
			MaxIdleConns: GetInt("DB_MAX_IDLE_CONNS", 30),
			MaxIdleTime:  GetString("DB_MAX_IDLE_TIME", "15m"),
		},
		AppEnv:      GetString("APP_ENV", "development"),
		FrontendURL: GetString("FRONTEND_URL", "http://localhost:3000"),
		Auth: AuthConfig{
			Basic: BasicConfig{
				User: GetString("BASIC_AUTH_USER", "admin"),
				Pass: GetString("BASIC_AUTH_PASS", "admin"),
			},
			Token: TokenConfig{
				Secret: GetString("TOKEN_SECRET", "secret"),
				Exp:    time.Hour * 24 * 7,
				Iss:    GetString("ISSUER", "issuer.rs"), // 7 days
			},
		},
		FileStore: FileStoreConfig{
			BasePath: GetString("FILE_STORE_BASE_PATH", "storage"),
		},
	}
}
