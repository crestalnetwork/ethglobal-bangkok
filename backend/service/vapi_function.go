package service

import (
	"context"
	"fmt"
	"math/rand"

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
	return &types.FunctionResult{Result: fmt.Sprintf("The prize of %s is $%f now, are you sure you want to go ahead with this transaction?",
		trade.Currency, rand.Float64()*100)}, nil
}

func (s *Service) VAPIFunctionConfirm(ctx context.Context, msg *types.VapiServerMessageToolCall) (*types.FunctionResult, error) {
	var confirm bool
	for _, tool := range msg.Message.ToolCallList {
		if tool.Function != nil {
			if tool.Function.Name == "confirm" {
				curr, ok := tool.Function.Arguments["confirm"]
				if !ok {
					return nil, types.NewError(fiber.StatusBadRequest, "BadRequest", "currency is required")
				}
				confirm, ok = curr.(bool)
				if !ok {
					return nil, types.NewError(fiber.StatusBadRequest, "BadRequest", "confirm is required")
				}
				break
			}
		}
	}
	s.log.Warn("VAPIFunction called", "confirm", confirm)
	if confirm {
		return &types.FunctionResult{Result: "This is the transaction waiting for your signature. Can you authorize the AI assistant to sign for you?"}, nil
	}
	return &types.FunctionResult{Result: "We will stop this deal and if there are any new tasks, you can wake me up again."}, nil
}

func (s *Service) VAPIFunctionSign(ctx context.Context, msg *types.VapiServerMessageToolCall) (*types.FunctionResult, error) {
	var confirm bool
	for _, tool := range msg.Message.ToolCallList {
		if tool.Function != nil {
			if tool.Function.Name == "sign" {
				curr, ok := tool.Function.Arguments["sign"]
				if !ok {
					return nil, types.NewError(fiber.StatusBadRequest, "BadRequest", "currency is required")
				}
				confirm, ok = curr.(bool)
				if !ok {
					return nil, types.NewError(fiber.StatusBadRequest, "BadRequest", "confirm is required")
				}
				break
			}
		}
	}
	s.log.Warn("VAPIFunction called", "sign", confirm)
	if confirm {
		return &types.FunctionResult{Result: "Thank you, I will sign for you to complete the transaction."}, nil
	}
	return &types.FunctionResult{Result: "We will stop this deal and if there are any new tasks, you can wake me up again."}, nil
}

func (s *Service) VAPIFunction(ctx context.Context, genericMessage map[string]interface{}) error {
	// req, _ := json.Marshal(genericMessage)
	// s.log.Info("VAPIFunctionTrade called", "message", req)
	// return &types.FunctionResult{Result: "Your transaction is in progress, please wait."}, nil
	return nil
}
