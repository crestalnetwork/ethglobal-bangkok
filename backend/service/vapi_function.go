package service

import (
	"context"

	"github.com/gofiber/fiber/v2"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func (s *Service) VAPIFunctionTrade(ctx context.Context, msg *types.VapiServerMessageToolCall) (*types.FunctionResult, error) {
	var trade = new(types.Trade)
	for _, tool := range msg.Message.ToolCallList {
		if tool.Function != nil {
			if tool.Function.Name == "trade" {
				curr, ok := tool.Function.Arguments["currency"]
				if !ok {
					return nil, types.NewError(fiber.StatusBadRequest, "BadRequest", "currency is required")
				}
				trade.Currency = curr.(string)
				amount, ok := tool.Function.Arguments["amount"]
				if !ok {
					return nil, types.NewError(fiber.StatusBadRequest, "BadRequest", "amount is required")
				}
				trade.Amount = amount.(float64)
				action, ok := tool.Function.Arguments["action"]
				if !ok {
					return nil, types.NewError(fiber.StatusBadRequest, "BadRequest", "action is required")
				}
				trade.Action = action.(string)
				break
			}
		}
	}
	s.log.Warn("VAPIFunction called", "trade", trade)
	return &types.FunctionResult{Result: "Your transaction is in progress, please wait."}, nil
}

func (s *Service) VAPIFunction(ctx context.Context, genericMessage map[string]interface{}) error {
	// req, _ := json.Marshal(genericMessage)
	// s.log.Info("VAPIFunctionTrade called", "message", req)
	// return &types.FunctionResult{Result: "Your transaction is in progress, please wait."}, nil
	return nil
}
