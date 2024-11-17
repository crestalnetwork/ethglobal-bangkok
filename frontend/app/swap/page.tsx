"use client"

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Image from 'next/image'
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";

import Vapi from "@vapi-ai/web";
import Link from "next/link";
const vapi = new Vapi("388edb4d-b8fb-4bb6-bb3a-7ddf0d7be2b5");


export default function Swap() {
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [chatting, setChatting] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [swapping, setSwapping] = useState(false)

  const [address, setAddress] = useState("")
  const [ethAmount, setEthAmount] = useState("")
  const [usdcAmount, setUsdcAmount] = useState(0)
  const [ethBalance, setEthBalance] = useState(10)
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [transactionHash, setTransactionHash] = useState('')

  useEffect(() => {
    getBalance();
  }, [])


  /**
   * Check Command
   */
  const checkCommand = async (callId: string, message: any) => {
    if (!callId) {
      return
    }

    // setLoadingBalance(true);
    try {
      const response = await fetch(`https://bangkok.service.crestal.dev/chats/${callId}/state`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const { step, trade } = data
      // console.log('message', message, step, trade);

      const { destination_token_symbol, origin_token_amount, origin_token_symbol, price } = trade

      const transcript = message.transcript || ''

      if (transcript.indexOf('connect') !== -1 && transcript.indexOf('wallet') !== -1) {
        connectWallet()
      } else if (!ethAmount && transcript.toLowerCase().indexOf('the price of') !== -1) {
        setEthAmount(origin_token_amount || 0.001);
        fetchPrice(Number(origin_token_amount || 0.001));
      } else if (step === 3 || transcript.indexOf('clear sign') !== -1) {
        vapi.stop();
        handleSwap(price || 0.001);
      }

    } catch (error) {
      console.error("Failed to get command", error);
    } finally {
      // setLoadingBalance(false);
    }
  }


  /**
   * Get Balance
   */
  const getBalance = async () => {
    setLoadingBalance(true);
    try {
      const response = await fetch("/api/get-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setEthBalance(data.ethBalance);
      setUsdcBalance(data.usdcBalance);
    } catch (error) {
      console.error("Failed to get balance", error);
      setEthBalance(0);
      setUsdcBalance(0);
    } finally {
      setLoadingBalance(false);
    }
  }


  /**
   * Start Chart
   */
  const startChart = async () => {
    if (!chatting) {
      const call = await vapi.start("b4d67474-30a9-432b-b3ec-fdf0121911e3");

      vapi.on("message", (message) => {
        // console.log(message);
        if (message.role === 'assistant') {
          checkCommand(call?.id || '', message);
        }
      });

      vapi.on("error", (e) => {
        console.error(e);
      });

    } else {
      vapi.stop();
    }

    setChatting(!chatting)
  }


  /**
   * Connect Wallet
   */
  const connectWallet = async () => {
    if (address) return;

    setConnecting(true);
    try {
      const response = await fetch("/api/connect-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setAddress(data.address);
    } catch (error) {
      console.error("Failed to connect", error);
      setAddress('');
    } finally {
      setConnecting(false);
    }
  };


  /**
   * Get Price
   */
  const fetchPrice = async (ethValue: number) => {
    if (!ethValue || isNaN(ethValue)) {
      setUsdcAmount(0);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/get-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ethAmount: ethValue }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setUsdcAmount(Number(data.usdcAmount));
    } catch (error) {
      console.error("Failed to fetch USDC price:", error);
      setUsdcAmount(0);
    } finally {
      setLoading(false);
    }
  };


  /**
   * Swap
   */
  const handleSwap = async (commandAmount: number) => {
    if (swapping || ethBalance < Number(ethAmount)) {
      return;
    }

    setSwapping(true);
    try {
      const response = await fetch("/api/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: commandAmount || usdcAmount }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setTransactionHash(data.transactionHash)

      getBalance();

      setEthAmount('')
      setUsdcAmount(0)
    } catch (error) {
      console.error("Failed to swap:", error);
    } finally {
      setSwapping(false);
    }
  }

  return (
    <div className="mt-4 p-4">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-6">Look Ma, No Hands!</h1>

        <div>
          {
            !address ? (
              <div>
                {
                  connecting ? (
                    <div>Connecting...</div>
                  ) : (
                    <Button onClick={connectWallet} className="bg-blue-5 text-white">Connect Wallet</Button>
                  )
                }
              </div>
            ) : (
              <div>
                <div>User Address: <span className="font-bold">{address}</span></div>
                <div>ETH Balance: <span className="font-bold">{ethBalance}</span></div>
                <div>USDC Balance: <span className="font-bold">{formatNumberWithCommas(usdcBalance, 2)}</span></div>
                {
                  !!transactionHash && (
                    <div>Blockscout Transaction Hash: <Link className="font-bold text-blue-6" href={`https://base.blockscout.com/tx/${transactionHash}`} target="_blank" rel='noopener noreferrer'>{transactionHash}</Link></div>
                  )
                }

                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Enter ETH amount"
                    value={ethAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEthAmount(value);
                      fetchPrice(Number(value));
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-72"
                  />

                  {loading ? (
                    <p className="text-gray-500">Fetching price...</p>
                  ) : (
                    <p className="text-lg">
                      Estimated USDC needed: <strong>{formatNumberWithCommas(usdcAmount, 2)} USDC</strong>
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  {
                    swapping && (
                      <p className="text-gray-500">Signing <span className="font-bold">ERC7730</span>...</p>
                    )
                  }
                  <Button className="mt-6" onClick={() => handleSwap()}>Swap</Button>
                </div>

              </div>
            )
          }
        </div>


        <div className="mt-8">
          <Image
            className="cursor-pointer rounded-2xl"
            src="/chat.png"
            width={160}
            height={160}
            alt="Start Chat"
            onClick={startChart}
          />
        </div>


      </div>
    </div>
  )
}
