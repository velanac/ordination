package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"github.com/velenac/ordiora/internal/db"
	"github.com/velenac/ordiora/internal/server"
	"github.com/velenac/ordiora/pkg/config"
	"github.com/velenac/ordiora/pkg/filestore"
)

func gracefulShutdown(apiServer *http.Server, done chan bool) {

	// Create context that listens for the interrupt signal from the OS.
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// Listen for the interrupt signal.
	<-ctx.Done()

	log.Println("shutting down gracefully, press Ctrl+C again to force")

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := apiServer.Shutdown(ctx); err != nil {
		log.Printf("Server forced to shutdown with error: %v", err)
	}

	log.Println("Server exiting")

	// Notify the main goroutine that the shutdown is complete
	done <- true
}

func main() {
	cfg := config.NewConfig()

	db, err := db.New(
		cfg.DB.DbServer,
		cfg.DB.Catalog,
		cfg.DB.MaxOpenConns,
		cfg.DB.MaxIdleConns,
		cfg.DB.MaxIdleTime,
		cfg.AppEnv,
	)
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	defer db.Close()
	fs := filestore.New(cfg.FileStore.BasePath)
	fs.SaveTestFile()
	server := server.NewServer(cfg, db, fs)

	// Create a done channel to signal when the shutdown is complete
	done := make(chan bool, 1)

	// Run graceful shutdown in a separate goroutine
	go gracefulShutdown(server, done)

	log.Printf("Starting server on port %s\n", cfg.Addr)

	err = server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		panic(fmt.Sprintf("http server error: %s", err))
	}

	// Wait for the graceful shutdown to complete
	<-done
	log.Println("Graceful shutdown complete.")
}
