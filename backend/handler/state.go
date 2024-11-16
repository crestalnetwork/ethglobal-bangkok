package handler

import (
	"github.com/gofiber/fiber/v2"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func (h *Handler) GetChatState(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return types.NewError(fiber.StatusBadRequest, "BadRequest", "missing id")
	}
	resp, err := h.s.GetChatState(c.Context(), id)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
