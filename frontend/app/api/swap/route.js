import { NextResponse } from "next/server";

// import { swap as oneInchSwap } from '../../services/1inch';
import { swap as coinbaseSwap } from '../../services/coinbase';


export async function POST(req) {
    const { amount } = await req.json();

    try {
        // const trade = await oneInchSwap({
        //     fromAssetId: 'usdc',
        //     toAssetId: 'eth',
        //     amount
        // })

        const trade = await coinbaseSwap({
            fromAssetId: 'usdc',
            toAssetId: 'eth',
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
