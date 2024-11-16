package types

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

// ServerError always the same
var ServerError = NewError(500, "ServerError",
	"There was an issue on the server side. Please report to us or try again later.")

// Error custom struct
type Error struct {
	err     error // support the Unwrap interface
	code    int
	Key     string `json:"error"`
	Message string `json:"message"`
}

// NewError Error
func NewError(code int, key string, msg string) *Error {
	return &Error{
		code:    code,
		Key:     key,
		Message: msg,
	}
}

// Newf create an Error use format
func Newf(code int, key string, format string, a ...interface{}) *Error {
	err := fmt.Errorf(format, a...)
	return &Error{
		err:     err,
		code:    code,
		Key:     key,
		Message: err.Error(),
	}
}

// Wrap an error, implement the official errors interface
func Wrap(code int, key string, err error) *Error {
	return &Error{
		err:     err,
		code:    code,
		Key:     key,
		Message: err.Error(),
	}
}

// Error makes it compatible with `error` interface.
func (e *Error) Error() string {
	return e.Message
}

// StatusCode is http status code
func (e *Error) StatusCode() int {
	return e.code
}

// Unwrap support the Unwrap interface
func (e *Error) Unwrap() error {
	return e.err
}

// WriteToResponse the error to the response using this helper when you're not using a framework.
// If you're using a framework, handle the error in the ErrorHandler, for example, as seen in xfiber/error.go.
func (e *Error) WriteToResponse(w http.ResponseWriter) {
	w.WriteHeader(e.code)
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(e)
}

// Is err the instance of Error,and has <key>?
func Is(err error, key string) bool {
	src, ok := As(err)
	if !ok {
		return false
	}
	if src.Key == key {
		return true
	}
	return false
}

// IsCode check if the status code is <code>
func IsCode(err error, code int) bool {
	src, ok := As(err)
	if !ok {
		return false
	}
	if src.code == code {
		return true
	}
	return false
}

// As check if the error is an instance of Error
func As(err error) (*Error, bool) {
	e := new(Error)
	if errors.As(err, &e) {
		return e, true
	}
	return nil, false
}
