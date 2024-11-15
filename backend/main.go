package main

import (
	"context"
	"errors"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

var log *slog.Logger
var config *types.Config

func init() {
	log = slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
	config = &types.Config{}
}

func main() {
	// Listen for a signal for graceful shutdown
	// Kubernetes will handle restarting the pod
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	err := Start(ctx)
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
