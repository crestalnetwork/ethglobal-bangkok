import { NextResponse } from "next/server";

import { ethers } from "ethers";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

export async function POST(req) {
    try {
        // const { ethAmount } = await req.json();

        // // Fetch USDC quote using OnChainKit
        // const usdcAmount = await onChainKit.getQuote({
        //     from: "ETH",
        //     to: "USDC",
        //     amount: ethers.utils.parseEther(ethAmount),
        // });

        // return NextResponse.json({
        //     usdcAmount: ethers.utils.formatUnits(usdcAmount, 6), // Format as human-readable USDC
        // });

        return NextResponse.json({
            usdcAmount: 100, // Format as human-readable USDC
        });
    } catch (error) {
        console.error("Error fetching quote:", error);
        return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
    }
}