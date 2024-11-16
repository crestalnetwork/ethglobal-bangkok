import { NextResponse } from "next/server";
import { Client } from "@coinbase/coinbase-sdk";

console.log("process.env.COINBASE_API_KEY", process.env.COINBASE_API_KEY);


const client = new Client({
    apiKey: process.env.COINBASE_API_KEY,
    apiSecret: process.env.COINBASE_API_SECRET,
    baseApiUrl: "https://api.coinbase.com", // Default endpoint for Coinbase
});

export async function POST(req) {
    try {
        const { ethAmount } = await req.json();

        if (!ethAmount || isNaN(ethAmount)) {
            return NextResponse.json(
                { error: "Invalid ETH amount" },
                { status: 400 }
            );
        }

        // Get real-time exchange rate from Coinbase API
        const rate = await client.spot.getExchangeRate("ETH", "USDC");
        const usdcNeeded = parseFloat(ethAmount) * parseFloat(rate);

        return NextResponse.json({
            usdcAmount: usdcNeeded.toFixed(2), // Format to 2 decimal places
        });
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return NextResponse.json(
            { error: "Failed to fetch exchange rate" },
            { status: 500 }
        );
    }
}
