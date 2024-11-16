import { NextResponse } from "next/server";

import { swap as coinbaseSwap, Coinbase } from '../../services/coinbase'


export async function POST(req) {
    const { amount } = await req.json();

    try {
        const trade = await coinbaseSwap({
            fromAssetId: Coinbase.assets.Usdc,
            toAssetId: Coinbase.assets.Eth,
            amount
        })

        return NextResponse.json(trade)
    } catch (error) {
        console.error("Error swap:", error);
        // return NextResponse.json({ error: "Failed to swap" }, { status: 500 });

        // Mock transaction result
        return NextResponse.json({
            success: false,
        })
    }
}
