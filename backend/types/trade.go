package types

var (
	TradeActionBuy  = "buy"
	TradeActionSell = "sell"
)

type Trade struct {
	Currency string  `json:"currency"`
	Amount   float64 `json:"amount"`
	Action   string  `json:"action"`
	Price    float64 `json:"price"`
}
