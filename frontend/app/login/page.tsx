"use client"

import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { MailIcon } from "../components/MailIcon";

import { WagmiProvider, http, cookieStorage, createConfig, createStorage, useAccount } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing
import { coinbaseWallet } from 'wagmi/connectors';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

// import { Swap, SwapAmountInput, SwapButton, SwapMessage, SwapToast, SwapToggleButton } from "@coinbase/onchainkit/swap";

// import { setOnchainKitConfig } from '@coinbase/onchainkit';
// import { buildSwapTransaction } from '@coinbase/onchainkit/api';
// import type { Token } from '@coinbase/onchainkit/token';

// const ETHToken: Token = {
//   address: "",
//   chainId: baseSepolia.id,
//   decimals: 18,
//   name: "Ethereum",
//   symbol: "ETH",
//   image: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
// };

// const USDCToken: Token = {
//   address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
//   chainId: baseSepolia.id,
//   decimals: 6,
//   name: "USDC",
//   symbol: "USDC",
//   image: "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
// };


import { useState } from "react";

const wagmiConfig = createConfig({
  chains: [baseSepolia], // add baseSepolia for testing
  connectors: [
    coinbaseWallet({
      appName: "OnchainKit",
      preference: 'smartWalletOnly',
      version: '4',
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: false,
  transports: {
    [baseSepolia.id]: http(), // add baseSepolia for testing
  },
});


export default function Login() {


  const [ethAmount, setEthAmount] = useState("");
  const [usdcAmount, setUsdcAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUSDCQuote = async (ethValue: number) => {
    if (!ethValue || isNaN(ethValue)) {
      setUsdcAmount(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.international.coinbase.com/api/v1/instruments/ETH-USDC/quote", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ ethAmount: ethValue }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setUsdcAmount(data.usdcAmount);
    } catch (error) {
      console.error("Failed to fetch USDC quote:", error);
      setUsdcAmount(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <WagmiProvider config={wagmiConfig}>
      <div>
        <div className="flex justify-center">
          <Card className="py-4 mt-20 w-[320px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h1 className="text-tiny uppercase font-bold">Sign in to Coinbase</h1>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Input
                className="!mt-10"
                type="email" label="Email" placeholder="Enter your email"
                labelPlacement="outside"
                startContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Button radius="full" className="mt-4 bg-blue-7 text-white font-bold">
                Continue
              </Button>
              <Button radius="full" className="mt-4 bg-grey-3 text-grey-9 font-semibold">
                Create account
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="mt-4 flex justify-center">
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
              <EthBalance />
            </ConnectWallet>

            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address className={color.foregroundMuted} />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>

        <div className="mt-4 p-4">
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-6">ETH to USDC Swap</h1>
            <input
              type="number"
              placeholder="Enter ETH amount"
              value={ethAmount}
              onChange={(e) => {
                const value = e.target.value;
                setEthAmount(value);
                fetchUSDCQuote(Number(value));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-72"
            />
            {loading ? (
              <p className="text-gray-500">Fetching quote...</p>
            ) : usdcAmount !== null ? (
              <p className="text-lg">
                Estimated USDC needed: <strong>{usdcAmount} USDC</strong>
              </p>
            ) : (
              <p className="text-gray-500">Enter an ETH amount to see the quote.</p>
            )}
          </div>
        </div>

      </div>

    </WagmiProvider>
  );
}
