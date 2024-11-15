package service

import (
	"context"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func (s *Service) VAPIFunction(ctx context.Context, genericMessage map[string]interface{}) (*types.FunctionResult, error) {
	s.log.Info("VAPIFunction called", "message", genericMessage)
	return &types.FunctionResult{Result: "Hello, World!"}, nil
}
