package handler

import (
	"github.com/gofiber/fiber/v2"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func (h *Handler) VAPIFunction(c *fiber.Ctx) error {
	var msg map[string]interface{}
	err := c.BodyParser(&msg)
	if err != nil {
		return types.NewError(fiber.StatusBadRequest, "BadRequest", err.Error())
	}
	err = h.s.VAPIFunction(c.Context(), msg)
	if err != nil {
		return err
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func (h *Handler) VAPIFunctionTrade(c *fiber.Ctx) error {
	var msg = new(types.VapiServerMessageToolCall)
	err := c.BodyParser(msg)
	if err != nil {
		return types.NewError(fiber.StatusBadRequest, "BadRequest", err.Error())
	}
	resp, err := h.s.VAPIFunctionTrade(c.Context(), msg)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
