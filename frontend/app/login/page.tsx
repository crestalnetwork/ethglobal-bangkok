"use client"

import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { MailIcon } from "../components/MailIcon";

import { WagmiProvider, http, cookieStorage, createConfig, createStorage, useAccount } from 'wagmi';
import { baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing
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
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

import SwapComponents from "../components/Swap";

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

  return (
    <WagmiProvider config={wagmiConfig}>
      <div>
        {/* <div className="flex justify-center">
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
        </div> */}

        <div className="mt-4 flex justify-center">
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
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

        <SwapComponents />

      </div>

    </WagmiProvider>
  );
}
