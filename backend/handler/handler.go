package handler

import "github.com/crestalnetwork/ethglobal-bangkok/backend/service"

type Handler struct {
	s *service.Service
}

func New(s *service.Service) *Handler {
	return &Handler{
		s: s,
	}
}
