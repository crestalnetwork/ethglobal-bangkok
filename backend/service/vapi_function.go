package service

import (
	"context"
	"encoding/json"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func (s *Service) VAPIFunction(ctx context.Context, genericMessage map[string]interface{}) (*types.FunctionResult, error) {
	req, _ := json.Marshal(genericMessage)
	s.log.Info("VAPIFunction called", "message", req)
	return &types.FunctionResult{Result: "Trade accept!"}, nil
}
