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
		h.log.Error("VAPIFunctionTrade", "error", err)
		h.log.Error("VAPIFunctionTrade body", "body", string(c.Body()))
		return types.NewError(fiber.StatusBadRequest, "BadRequest", err.Error())
	}
	resp, err := h.s.VAPIFunctionTrade(c.Context(), msg)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
func (h *Handler) VAPIFunctionConfirm(c *fiber.Ctx) error {
	var msg = new(types.VapiServerMessageToolCall)
	err := c.BodyParser(msg)
	if err != nil {
		h.log.Error("VAPIFunctionConfirm", "error", err)
		h.log.Error("VAPIFunctionConfirm body", "body", string(c.Body()))
		return types.NewError(fiber.StatusBadRequest, "BadRequest", err.Error())
	}
	resp, err := h.s.VAPIFunctionConfirm(c.Context(), msg)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
func (h *Handler) VAPIFunctionSign(c *fiber.Ctx) error {
	var msg = new(types.VapiServerMessageToolCall)
	err := c.BodyParser(msg)
	if err != nil {
		h.log.Error("VAPIFunctionSign", "error", err)
		h.log.Error("VAPIFunctionSign body", "body", string(c.Body()))
		return types.NewError(fiber.StatusBadRequest, "BadRequest", err.Error())
	}
	resp, err := h.s.VAPIFunctionSign(c.Context(), msg)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
