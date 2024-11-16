"use client"

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";

export default function Swap() {
  const [connecting, setConnecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [swapping, setSwapping] = useState(false);

  const [address, setAddress] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [usdcAmount, setUsdcAmount] = useState(0);
  const [ethBalance, setEthBalance] = useState(10)
  const [usdcBalance, setUsdcBalance] = useState(0)


  /**
   * Connect Wallet
   */
  const connectWallet = async () => {
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

      setUsdcAmount(data.usdcAmount);
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
  const handleSwap = async () => {
    if (swapping || ethBalance < Number(ethAmount)) {
      return;
    }

    setSwapping(true);
    try {
      const response = await fetch("/api/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ethAmount }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setEthBalance(ethBalance - Number(ethAmount));
      setUsdcBalance(usdcBalance + Number(usdcAmount));

      setEthAmount('')
      setUsdcAmount(0)
    } catch (error) {
      console.error("Failed to fetch USDC price:", error);
    } finally {
      setSwapping(false);
    }
  }

  return (
    <div className="mt-4 p-4">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-6">Voice Trading</h1>

        {
          !address ? (
            <div>
              {
                connecting ? (
                  <div>Connecting...</div>
                ) : (
                  <Button onClick={connectWallet}>Connect Wallet</Button>
                )
              }
            </div>
          ) : (
            <div>
              <div>User Address: <span className="font-bold">{address}</span></div>
              <div>ETH Balance: <span className="font-bold">{ethBalance}</span></div>
              <div>USDC Balance: <span className="font-bold">{formatNumberWithCommas(usdcBalance, 2)}</span></div>


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
                    <p className="text-gray-500">Signing ERC7730...</p>
                  )
                }
                <Button className="mt-6" onClick={handleSwap}>Swap</Button>
              </div>

            </div>
          )
        }



      </div>
    </div>
  )
}
