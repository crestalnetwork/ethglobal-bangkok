package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/gofiber/fiber/v2/middleware/recover"
	slogfiber "github.com/samber/slog-fiber"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/handler"
	"github.com/crestalnetwork/ethglobal-bangkok/backend/service"
	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func Start(ctx context.Context) error {
	// service
	s, err := service.New(service.Options{
		Config: config,
		Logger: log,
	})
	if err != nil {
		return err
	}
	h := handler.New(s, log)
	// fiber app
	app := fiber.New(fiber.Config{
		ReadTimeout:              60 * time.Second,
		WriteTimeout:             60 * time.Second,
		IdleTimeout:              60 * time.Second,
		AppName:                  "bangkok-hackathon",
		ErrorHandler:             ErrorHandler,
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

	// register routes
	app.Post("/function/assistant", h.VAPIFunction)
	app.Post("/function/trade", h.VAPIFunctionTrade)

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

// ErrorHandler is a fiber error handler
func ErrorHandler(ctx *fiber.Ctx, err error) error {
	var final *types.Error

	// will check these types of errors
	var fe *fiber.Error

	if errors.As(err, &final) {
		// error already convert to final, will process it later
	} else if errors.As(err, &fe) {
		final = types.NewError(fe.Code, strings.ReplaceAll(http.StatusText(fe.Code), " ", ""), fe.Message)
	} else if errors.Is(err, context.Canceled) {
		final = types.Wrap(fiber.StatusBadRequest, "ClientCancelled", err)
	} else {
		// other errors
		final = types.Wrap(fiber.StatusInternalServerError, "ServerError", err)
	}

	// log the internal server error
	if final.StatusCode() >= fiber.StatusInternalServerError {
		// log the error
		slog.Error("internal server error", "error", final, "component", "fiber")
	}

	return ctx.Status(final.StatusCode()).JSON(final)
}
