import { Address } from 'viem'; // Ensure you have Address type available

type Token = {
    address: Address; // The address of the token contract
    chainId: number; // The chain id of the token contract
    decimals: number; // The number of token decimals
    image: string | null; // A string URL of the token logo
    name: string; // The full name of the token
    symbol: string; // A ticker symbol or shorthand, up to 11 characters
};

// Define USDC Token for Base Sepolia
const usdcToken: Token = {
    address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as Address, // Replace with actual USDC address on Base Sepolia
    chainId: 84532, // Base Sepolia chain ID
    decimals: 6, // USDC typically has 6 decimals
    image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=024', // Replace with your preferred logo URL
    name: 'USD Coin (Base Sepolia)',
    symbol: 'USDC',
};

// Define ETH Token for Base Sepolia
const ethToken: Token = {
    address: '0x0000000000000000000000000000000000000000' as Address, // Native ETH
    chainId: 84532, // Base Sepolia chain ID
    decimals: 18, // ETH typically has 18 decimals
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024', // Replace with your preferred logo URL
    name: 'Ethereum (Base Sepolia)',
    symbol: 'ETH',
};

// Export tokens
export { usdcToken, ethToken };