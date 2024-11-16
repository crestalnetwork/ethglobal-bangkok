package handler

import (
	"log/slog"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/service"
)

type Handler struct {
	s   *service.Service
	log *slog.Logger
}

func New(s *service.Service, log *slog.Logger) *Handler {
	return &Handler{
		s:   s,
		log: log,
	}
}
