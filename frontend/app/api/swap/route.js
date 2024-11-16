import { NextResponse } from "next/server";

import { ethers } from "ethers";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

export async function POST(req) {
    try {
        const { ethAmount } = await req.json();

        return NextResponse.json({
            ethAmount: ethAmount,
        });
    } catch (error) {
        console.error("Error swap:", error);
        return NextResponse.json({ error: "Failed to swap" }, { status: 500 });
    }
}