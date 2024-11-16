package handler

import "github.com/gofiber/fiber/v2"

func (h *Handler) GetChatState(c *fiber.Ctx) error {
	resp, err := h.s.GetChatState(c.Context())
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
