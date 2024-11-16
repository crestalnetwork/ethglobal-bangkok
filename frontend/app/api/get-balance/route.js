import { NextResponse } from "next/server";

import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import fs from 'fs'
import path from 'path'

Coinbase.configureFromJson({ filePath: '~/Downloads/cdp_api_key.json' });

const seedPath = path.join('./app/api/swap/my-seed.json')

export async function POST(req) {
    try {
        const mySeed = fs.readFileSync(seedPath, 'utf-8');

        let importedWallet = await Wallet.import(JSON.parse(mySeed));
        let wallet = importedWallet

        const ethBalance = await wallet.getBalance(Coinbase.assets.Eth)
        const usdcBalance = await wallet.getBalance(Coinbase.assets.Usdc)

        return NextResponse.json({
            ethBalance,
            usdcBalance,
        })
    } catch (error) {
        console.error("Error fetching balance:", error);
        return NextResponse.json(
            { error: "Failed to fetch balance" },
            { status: 500 }
        );
    }
}
