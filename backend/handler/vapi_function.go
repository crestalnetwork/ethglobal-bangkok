package handler

import (
	"github.com/gofiber/fiber/v2"
)

func (h *Handler) VAPIFunction(c *fiber.Ctx) error {
	var genericMessage map[string]interface{}
	err := c.BodyParser(&genericMessage)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	resp, err := h.s.VAPIFunction(c.Context(), genericMessage)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
