package types

type State struct {
	CallID      string `json:"call_id"`
	Step        int    `json:"step"`         // 0 start, 1 confirming, 2 signing, 3 trading, 4 done
	Trade       Trade  `json:"trade"`        // start from 1
	IsConfirmed bool   `json:"is_confirmed"` // start from 2
	EIP7730     string `json:"eip7730"`      // start from 2
	IsSigned    bool   `json:"is_signed"`    // start from 3
}
