import inch from "@1inch/cross-chain-sdk";
import { getTokenByName } from './token';

const {
    HashLock,
    NetworkEnum,
    OrderStatus,
    PresetEnum,
    PrivateKeyProviderConnector,
    SDK,
} = inch;

import Web3 from "web3";
import { randomBytes } from 'node:crypto'

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

//mainnetacc
const privateKey = "***REMOVED***";
const rpc = 'https://ethereum-rpc.publicnode.com'

// const privateKey = "***REMOVED***";
// const rpc = "http://127.0.0.1:8545";

const authKey = "***REMOVED***";
const source = "sdk-tutorial";

const web3 = new Web3(rpc);
const walletAddress =
    web3.eth.accounts.privateKeyToAccount(privateKey).address;

const sdk = new SDK({
    url: "https://api.1inch.dev/fusion-plus",
    authKey,
    blockchainProvider: new PrivateKeyProviderConnector(privateKey, web3), // only required for order creation
});

export const swap = async function (srcToken: string, dstToken: string, amount: string) {
    const srcNetwork = NetworkEnum.GNOSIS;
    const dstNetwork = NetworkEnum.ARBITRUM;
    const srcTokenAddress = await getTokenByName(srcNetwork.toString(), srcToken); // "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
    const dstTokenAddress = await getTokenByName(dstNetwork.toString(), dstToken); // "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"

    console.log(srcTokenAddress);
    console.log(dstTokenAddress);

    const quote = await sdk.getQuote({
        amount: amount,
        srcChainId: srcNetwork,
        dstChainId: dstNetwork,
        enableEstimate: true,
        srcTokenAddress: srcTokenAddress!, // "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
        dstTokenAddress: dstTokenAddress!, // "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        walletAddress,
    });
    const preset = PresetEnum.fast;

    // generate secrets  
    const secrets = Array.from({
        length: quote.presets[preset].secretsCount
    }).map(() => '0x' + randomBytes(32).toString('hex'));

    const hashLock =
        secrets.length === 1
            ? HashLock.forSingleFill(secrets[0])
            : HashLock.forMultipleFills(HashLock.getMerkleLeaves(secrets));

    const secretHashes = secrets.map((s) => HashLock.hashSecret(s));
    // create order  
    const { hash, quoteId, order } = await sdk.createOrder(quote, {
        walletAddress,
        hashLock,
        preset,
        source,
        secretHashes
    });
    console.log({ hash }, 'order created');

    // submit order  
    const _orderInfo = await sdk.submitOrder(
        quote.srcChainId,
        order,
        quoteId,
        secretHashes
    );
    console.log({ hash }, 'order submitted');

    // submit secrets for deployed escrows  
    while (true) {
        try {
            const secretsToShare = await sdk.getReadyToAcceptSecretFills(hash);

            if (secretsToShare.fills.length) {
                for (const { idx } of secretsToShare.fills) {
                    await sdk.submitSecret(hash, secrets[idx])

                    console.log({ idx }, 'shared secret');
                }
            }

            // check if order finished  
            const { status } = await sdk.getOrderStatus(hash);

            if (
                status === OrderStatus.Executed ||
                status === OrderStatus.Expired ||
                status === OrderStatus.Refunded
            ) {
                break
            }

            await sleep(100000)
        } catch (e) {
            console.error(e);
        } finally {
            console.log('Done');
        }
    }

    const statusResponse = await sdk.getOrderStatus(hash);
    console.log(statusResponse);
};
