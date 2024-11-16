package service

import (
	"log/slog"
	"sync"

	"github.com/samber/oops"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

type Options struct {
	Config *types.Config
	Logger *slog.Logger
}

type Service struct {
	config  *types.Config
	log     *slog.Logger
	state   sync.Map // call id -> state
	wallet  string
	balance sync.Map // symbol -> balance
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
		wallet: "0x3487c3010Ba226abDc0cf058875f88e4a0F1eC92", // hardcode now
	}, nil
}
