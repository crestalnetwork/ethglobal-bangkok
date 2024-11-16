# erc7730

## Rationale

This is to support 1inch's latest AggregationRouterV6 interface clear signing ([ERC-7730](https://developers.ledger.com/docs/clear-signing/erc7730)).

We need to get the ABIs from 1inch contracts, then generate a diff from V5 to V6 to understand how to modify for the [erc7730 registry](https://github.com/LedgerHQ/clear-signing-erc7730-registry).

## Dependencies

Install abi-to-sol (or use online version)
```bash
npm install -g abi-to-sol
```

Run abi-to-sol for the ABI of choice, for example
```bash
cat AggregationRouterV5.abi | npx abi-to-sol --solidity-version=0.8.28 AggregationRouterV5 > AggregationRouterV5.interface.sol
cat AggregationRouterV6.abi | npx abi-to-sol --solidity-version=0.8.28 AggregationRouterV6 > AggregationRouterV6.interface.sol
```

Then diff them
```bash
diff AggregationRouterV5.interface.sol AggregationRouterV6.interface.sol
```
