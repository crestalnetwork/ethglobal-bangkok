package service

import (
	"context"
	"fmt"
	"math/rand"

	"github.com/gofiber/fiber/v2"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func (s *Service) VAPIFunctionTrade(ctx context.Context, msg *types.VapiServerMessageToolCall) (*types.ToolResults, error) {
	var id string
	var trade = new(types.Trade)
	var resp = new(types.ToolResults)
	resp.Results = make([]types.ToolResult, 0)
	for _, tool := range msg.Message.ToolCallList {
		if tool.Function != nil {
			if tool.Function.Name == "trade" {
				id = tool.Id
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

	callID := msg.Message.Call.Id
	// check the call id
	state, err := s.GetChatState(ctx, callID)
	if err != nil {
		return nil, err
	}
	if state.Step > 0 {
		return vapiToolResponse(id, fmt.Sprintf("You are trading %s, please confirm or cancel the transaction.", state.Trade.Currency)), nil
	}

	s.log.Warn("VAPIFunction trade called", "state", state)
	trade.Price = rand.Float64() * 100 // mock the price
	// update the state
	state.Trade = *trade
	state.Step = 1
	s.state.Store(callID, state)
	return vapiToolResponse(id, fmt.Sprintf("Tell the user: The prize of %s is $%f now, are you sure you want to go ahead with this transaction?", trade.Currency, trade.Price)), nil
}

func (s *Service) VAPIFunctionConfirm(ctx context.Context, msg *types.VapiServerMessageToolCall) (*types.ToolResults, error) {
	var id string
	var confirm bool
	var resp = new(types.ToolResults)
	resp.Results = make([]types.ToolResult, 0)
	for _, tool := range msg.Message.ToolCallList {
		if tool.Function != nil {
			if tool.Function.Name == "confirm" {
				id = tool.Id
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

	callID := msg.Message.Call.Id
	// check the call id
	state, err := s.GetChatState(ctx, callID)
	if err != nil {
		return nil, err
	}
	if state.Step > 1 {
		return vapiToolResponse(id, fmt.Sprintf("You are trading %s, please confirm or cancel the transaction.", state.Trade.Currency)), nil
	}

	// update the state
	state.Step = 2
	state.IsConfirmed = confirm
	s.state.Store(callID, state)

	s.log.Warn("VAPIFunction confirm called", "state", state)
	if confirm {
		res := types.ToolResult{ToolCallID: id, Result: `Tell the user:"This is the transaction waiting for your signature. Can you authorize the AI assistant to sign for you"`}
		resp.Results = append(resp.Results, res)
	} else {
		res := types.ToolResult{ToolCallID: id, Result: `Tell the
		user:"We will stop this deal and if there are any new tasks, you can wake me up again."`}
		resp.Results = append(resp.Results, res)
	}
	return resp, nil
}

func (s *Service) VAPIFunctionSign(ctx context.Context, msg *types.VapiServerMessageToolCall) (*types.ToolResults, error) {
	var id string
	var confirm bool
	var resp = new(types.ToolResults)
	resp.Results = make([]types.ToolResult, 0)
	for _, tool := range msg.Message.ToolCallList {
		if tool.Function != nil {
			if tool.Function.Name == "sign" {
				id = tool.Id
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

	callID := msg.Message.Call.Id
	// check the call id
	state, err := s.GetChatState(ctx, callID)
	if err != nil {
		return nil, err
	}
	if state.Step > 2 {
		return vapiToolResponse(id, fmt.Sprintf("You are trading %s, please confirm or cancel the transaction.", state.Trade.Currency)), nil
	}

	// update the state
	state.Step = 3
	state.IsSigned = confirm
	state.EIP7730 = "EIP7730 Mock Data"
	s.state.Store(callID, state)

	s.log.Warn("VAPIFunction sign called", "state", state)
	if confirm {
		res := types.ToolResult{ToolCallID: id, Result: `Tell the user:"Thank you, I will sign for you to complete the transaction."`}
		resp.Results = append(resp.Results, res)
	} else {
		res := types.ToolResult{ToolCallID: id, Result: `Tell the
		user:"We will stop this deal and if there are any new tasks, you can wake me up again."`}
		resp.Results = append(resp.Results, res)
	}
	return resp, nil
}

func (s *Service) VAPIFunction(ctx context.Context, genericMessage map[string]interface{}) error {
	// req, _ := json.Marshal(genericMessage)
	// s.log.Info("VAPIFunctionTrade called", "message", req)
	// return &types.FunctionResult{Result: "Your transaction is in progress, please wait."}, nil
	return nil
}

func vapiToolResponse(toolID string, result string) *types.ToolResults {
	return &types.ToolResults{
		Results: []types.ToolResult{
			{
				ToolCallID: toolID,
				Result:     result,
			},
		},
	}
}
