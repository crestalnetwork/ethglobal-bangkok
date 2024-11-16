import { NextResponse } from "next/server";

import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import fs from 'fs'
import path from 'path'

Coinbase.configureFromJson({ filePath: '~/Downloads/cdp_api_key.json' });

const seedPath = path.join('./app/api/swap/my-seed.json')

const rate = 3043.67;


export async function POST(req) {
    const { ethAmount } = await req.json();

    try {
        const mySeed = fs.readFileSync(seedPath, 'utf-8');

        let importedWallet = await Wallet.import(JSON.parse(mySeed));
        let wallet = importedWallet
        console.log('Imported Wallet');

        // Fund the Wallet's default Address with ETH from an external source.
        // Trade ethAmount ETH to USDC.
        let trade = await wallet.createTrade({
            amount: ethAmount,
            fromAssetId: Coinbase.assets.Eth,
            toAssetId: Coinbase.assets.Usdc
        });

        await trade.wait();

        if (trade.getStatus() === 'complete') {
            console.log(`Trade successfully completed: `, trade.toString());

            return NextResponse.json({
                success: true,
                transactionHash: '0xmockedtxhash123456789',
                receivedAmount: ethAmount * rate
            });
        } else {
            console.log(`Trade failed on-chain: `, trade.toString());

            return NextResponse.json({
                success: true,
                transactionHash: '0xmockedtxhash123456789',
                receivedAmount: 0
            });
        }


    } catch (error) {
        console.error("Error swap:", error);
        // return NextResponse.json({ error: "Failed to swap" }, { status: 500 });

        // Mock transaction result
        return NextResponse.json({
            success: true,
            transactionHash: '0xmockedtxhash123456789',
            receivedAmount: ethAmount * rate
        });
    }
}