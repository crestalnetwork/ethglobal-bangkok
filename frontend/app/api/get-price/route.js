import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { ethAmount } = await req.json();

        if (!ethAmount || isNaN(ethAmount)) {
            return NextResponse.json(
                { error: "Invalid ETH amount" },
                { status: 400 }
            );
        }

        // TODO: Get real-time exchange rate from Coinbase API
        const rate = 3043.67;
        const usdcNeeded = parseFloat(ethAmount) * parseFloat(rate);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    NextResponse.json({
                        usdcAmount: usdcNeeded.toFixed(2), // Format to 2 decimal places
                    })
                )
            }, 500)

        })
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return NextResponse.json(
            { error: "Failed to fetch exchange rate" },
            { status: 500 }
        );
    }
}
