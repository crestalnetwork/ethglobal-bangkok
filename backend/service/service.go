package service

import (
	"log/slog"

	"github.com/samber/oops"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

type Options struct {
	Config *types.Config
	Logger *slog.Logger
}

type Service struct {
	config *types.Config
	log    *slog.Logger
}

func New(options Options) (*Service, error) {
	if options.Config == nil {
		return nil, oops.Errorf("config is required")
	}
	var log *slog.Logger
	if options.Logger == nil {
		log = slog.Default()
	} else {
		log = options.Logger
	}
	return &Service{
		config: options.Config,
		log:    log,
	}, nil
}
