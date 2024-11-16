import { NextResponse } from "next/server";

import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import fs from 'fs'
import path from 'path'

Coinbase.configureFromJson({ filePath: '~/Downloads/cdp_api_key.json' });

const seedPath = path.join('./app/api/swap/my-seed.json')


export async function POST() {
    try {
        let wallet;
        const mySeed = fs.readFileSync(seedPath, 'utf-8');

        let address;
        if (mySeed) {
            const mySeedJSON = JSON.parse(mySeed);
            let importedWallet = await Wallet.import(mySeedJSON);
            wallet = importedWallet
            address = mySeedJSON.address
            console.log('Imported Wallet', address);
        } else {
            // Create a Wallet on Base to trade assets with.
            wallet = await Wallet.create({ networkId: Coinbase.networks.BaseMainnet });

            // Export the data required to re-instantiate the wallet. The data contains the seed and the ID of the wallet.

            let addressInfo = await wallet.getDefaultAddress();
            const match = addressInfo.toString().match(/addressId:\s*'([^']+)'/);
            address = match ? match[1] : '';

            let seed = wallet.export();
            const walletData = {
                ...seed,
                address,
            }
            fs.writeFileSync(seedPath, JSON.stringify(walletData, null, 4))
        }

        console.log('address', address);

        return NextResponse.json({
            success: true,
            address
        });
    } catch (error) {
        console.error("Error swap:", error);
        return NextResponse.json({ error: "Failed to swap" }, { status: 500 });
    }
}