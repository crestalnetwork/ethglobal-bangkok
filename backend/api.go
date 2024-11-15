package main

import (
	"context"
	"errors"
	"log/slog"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/gofiber/fiber/v2/middleware/recover"
	slogfiber "github.com/samber/slog-fiber"
)

func start(ctx context.Context) error {
	// fiber app
	app := fiber.New(fiber.Config{
		ReadTimeout:              60 * time.Second,
		WriteTimeout:             60 * time.Second,
		IdleTimeout:              60 * time.Second,
		AppName:                  "bangkok-hackathon",
		DisableStartupMessage:    true,
		EnableSplittingOnParsers: true,
	})

	// logger
	app.Use(slogfiber.NewWithConfig(log, slogfiber.Config{
		ClientErrorLevel: slog.LevelInfo,
		ServerErrorLevel: slog.LevelInfo,
		WithUserAgent:    true,
		Filters: []slogfiber.Filter{func(ctx *fiber.Ctx) bool {
			if strings.HasPrefix(ctx.Path(), "/health_check") {
				return false
			}
			return true
		}},
	}))

	// extend your config for customization
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Accept, Authorization, Content-Type, Accept-Encoding, Origin, Accept",
		AllowMethods: "GET,PUT,POST,DELETE,HEAD,OPTIONS",
	}))

	app.Use(healthcheck.New(healthcheck.Config{
		LivenessEndpoint: "/health_check",
	}))

	// recover panic in handler
	app.Use(recover.New(recover.Config{EnableStackTrace: true}))

	go func() {
		<-ctx.Done()
		err := app.ShutdownWithTimeout(8 * time.Second)
		if errors.Is(err, context.DeadlineExceeded) {
			log.Warn("failed to shutdown server gracefully", "error", err)
		} else if err != nil {
			log.Error("failed to shutdown server", "error", err)
		} else {
			log.Info("server shutdown gracefully")
		}
	}()

	addr := ":8080" // read from config in production
	log.Info("api server listen to", "addr", addr)
	return app.Listen(addr)
}
