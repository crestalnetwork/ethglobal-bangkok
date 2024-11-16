package service

import (
	"context"

	"github.com/crestalnetwork/ethglobal-bangkok/backend/types"
)

func (s *Service) GetChatState(ctx context.Context, id string) (*types.State, error) {
	var resp *types.State
	raw, ok := s.state.Load(id)
	if !ok {
		resp = &types.State{
			CallID: id,
		}
		s.state.Store(id, resp)
		return resp, nil
	}
	resp = raw.(*types.State)
	return resp, nil
}
