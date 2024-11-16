package handler

import (
	"github.com/gofiber/fiber/v2"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func (h *Handler) VAPIFunctionTrade(c *fiber.Ctx) error {
	var genericMessage map[string]interface{}
	err := c.BodyParser(&genericMessage)
	if err != nil {
		return types.NewError(fiber.StatusBadRequest, "BadRequest", err.Error())
	}
	resp, err := h.s.VAPIFunction(c.Context(), genericMessage)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
