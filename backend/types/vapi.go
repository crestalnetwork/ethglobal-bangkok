package types

import (
	"encoding/json"

	vapi "github.com/VapiAI/server-sdk-go"
)

type VapiWebhookEnum string

const (
	AssistantRequest VapiWebhookEnum = "assistant-request"
	FunctionCall     VapiWebhookEnum = "function-call"
	StatusUpdate     VapiWebhookEnum = "status-update"
	EndOfCallReport  VapiWebhookEnum = "end-of-call-report"
	Hang             VapiWebhookEnum = "hang"
	SpeechUpdate     VapiWebhookEnum = "speech-update"
	Transcript       VapiWebhookEnum = "transcript"
)

type ConversationMessage struct {
	Role             string  `json:"role"`
	Message          *string `json:"message,omitempty"`
	Name             *string `json:"name,omitempty"`
	Args             *string `json:"args,omitempty"`
	Result           *string `json:"result,omitempty"`
	Time             int64   `json:"time"`
	EndTime          *int64  `json:"endTime,omitempty"`
	SecondsFromStart int     `json:"secondsFromStart"`
}
type BaseVapiPayload struct {
	Type VapiWebhookEnum `json:"type"`
	Call vapi.Call       `json:"call"`
}

type AssistantRequestPayload struct {
	BaseVapiPayload
}

func (p AssistantRequestPayload) GetCallType() VapiWebhookEnum {
	return p.Type
}

type StatusUpdatePayload struct {
	BaseVapiPayload
	Status vapi.CallStatus `json:"status"`
	vapi.ToolCallMessage
	Messages []ConversationMessage `json:"messages,omitempty"`
}

func (p StatusUpdatePayload) GetCallType() VapiWebhookEnum {
	return p.Type
}

type ToolResults struct {
	Results []ToolResult `json:"results"`
}

type ToolResult struct {
	ToolCallID string `json:"toolCallId"`
	Result     string `json:"result"`
}

type VapiServerMessageToolCall struct {
	Message VapiServerMessageToolCallMessage `json:"message"`
}

type VapiServerMessageToolCallMessage struct {
	Call            vapi.Call        `json:"call"`
	ToolCallList    []*vapi.ToolCall `json:"toolCallList,omitempty" url:"toolCallList,omitempty"`
	extraProperties map[string]interface{}
	_rawJSON        json.RawMessage
}
