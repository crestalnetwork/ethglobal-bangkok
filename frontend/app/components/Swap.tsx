import { Button } from "@nextui-org/react";
import { useState } from "react";


export default function SwapComponents() {
    const [ethAmount, setEthAmount] = useState("");
    const [usdcAmount, setUsdcAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ethBalance, setEthBalance] = useState(0)


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
        setLoading(true);
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

            setEthAmount('')
            setUsdcAmount(0)

            setEthBalance(data.ethAmount);
        } catch (error) {
            console.error("Failed to fetch USDC price:", error);
            setEthBalance(0);
        } finally {
            setLoading(false);
        }
    }

    return (
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
                        fetchPrice(Number(value));
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-72"
                />
                {loading ? (
                    <p className="text-gray-500">Fetching price...</p>
                ) : usdcAmount !== 0 ? (
                    <p className="text-lg">
                        Estimated USDC needed: <strong>{usdcAmount} USDC</strong>
                    </p>
                ) : (
                    <p className="text-gray-500">Enter an ETH amount to see the price.</p>
                )}

                <Button onClick={handleSwap}>Swap</Button>
                ETH Balance: {ethBalance}
            </div>
        </div>
    )
}
