package main

import (
	"context"
	"errors"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
)

var log *slog.Logger

func init() {
	log = slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
}

func main() {
	// Listen for a signal for graceful shutdown
	// Kubernetes will handle restarting the pod
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	err := start(ctx)
	if errors.Is(err, context.Canceled) {
		log.Info("service shutdown gracefully")
		return
	} else if err != nil {
		log.Error("service stopped unexpectedly", "error", err)
	} else {
		return
	}
	os.Exit(1)
}
