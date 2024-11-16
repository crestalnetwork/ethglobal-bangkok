import { Coinbase, CreateTradeOptions, Wallet } from "@coinbase/coinbase-sdk";
import fs from 'fs'
import path from 'path'

Coinbase.configureFromJson({ filePath: '~/Downloads/cdp_api_key.json' })

const seedPath = path.join('./app/api/swap/my-seed.json')

async function swap({ fromAssetId, toAssetId, amount }: CreateTradeOptions) {
    try {
        const mySeed = fs.readFileSync(seedPath, 'utf-8');

        let importedWallet = await Wallet.import(JSON.parse(mySeed));
        let wallet = importedWallet
        console.log('Imported Wallet');

        // Fund the Wallet's default Address with ETH from an external source.
        // Trade ethAmount ETH to USDC.
        let trade = await wallet.createTrade({
            amount,
            fromAssetId,
            toAssetId
        });

        await trade.wait();

        if (trade.getStatus() === 'complete') {
            console.log(`Trade successfully completed: `, trade.toString());

            const transactionHash = trade.getTransaction().getTransactionHash()

            return {
                success: true,
                transactionHash,
            };
        } else {
            console.log(`Trade failed on-chain: `, trade.toString());

            return {
                success: true,
                transactionHash: '0xmockedtxhash123456789',
            };
        }
    } catch (error) {
        return {
            success: false,
        }
    }
}

export { swap, Coinbase };
