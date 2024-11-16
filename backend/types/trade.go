package types

var (
	TradeActionBuy  = "buy"
	TradeActionSell = "sell"
)

type Trade struct {
	OriginTokenSymbol      string  `json:"origin_token_symbol"`
	OriginTokenAmount      float64 `json:"origin_token_amount"`
	DestinationTokenSymbol string  `json:"destination_token_symbol"`
	Price                  float64 `json:"price"`
}
