import inch from "@1inch/cross-chain-sdk";
import { getTokenByName } from './token.ts';

const {
  HashLock,
  NetworkEnum,
  OrderStatus,
  PresetEnum,
  PrivateKeyProviderConnector,
  SDK,
  SupportedChains
} = inch;

import Web3, { ERR_VALIDATION, errors } from "web3";
import { randomBytes } from 'node:crypto'

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const swap = async function (srcNetwork: string, srcToken: string, dstNetwork: string, dstToken: string, amount: string) {
  //mainnetacc
  const privateKey = "0x";
  const rpc = 'https://endpoints.omniatech.io/v1/matic/mainnet/public'

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


  const srcTokenAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" //await getTokenByName(srcNetwork, srcToken); 
  const dstTokenAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" //await getTokenByName(dstNetwork, dstToken);

  console.log(srcTokenAddress)
  console.log(dstTokenAddress)

  try {
    const quote = await sdk.getQuote({
      amount: amount,
      srcChainId: SupportedChains[1],//getSupportedChainByValue(srcNetwork),
      dstChainId: SupportedChains[2], ///getSupportedChainByValue(dstNetwork),
      enableEstimate: true,
      srcTokenAddress: srcTokenAddress,// srcTokenAddress,//"0xc2132d05d31c914a87c6611c10748aeb04b58e8f", // USDT
      dstTokenAddress: dstTokenAddress, //dstTokenAddress, // "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // BNB
      walletAddress,
    });
    const preset = PresetEnum.fast

    // generate secrets  
    const secrets = Array.from({
      length: quote.presets[preset].secretsCount
    }).map(() => '0x' + randomBytes(32).toString('hex'))

    const hashLock =
      secrets.length === 1
        ? HashLock.forSingleFill(secrets[0])
        : HashLock.forMultipleFills(HashLock.getMerkleLeaves(secrets))

    const secretHashes = secrets.map((s) => HashLock.hashSecret(s))

    // create order  
    const { hash, quoteId, order } = await sdk.createOrder(quote, {
      walletAddress,
      hashLock,
      preset,
      source,
      secretHashes
    })
    console.log({ hash }, 'order created')

    try {
      // submit order  
      const _orderInfo = await sdk.submitOrder(
        quote.srcChainId,
        order,
        quoteId,
        secretHashes
      )
      console.log({ hash }, 'order submitted')
    } catch (e) {
      console.error(e);
    } finally {
      console.log('Done');
    }

    // submit secrets for deployed escrows  
    while (true) {
      try {
        const secretsToShare = await sdk.getReadyToAcceptSecretFills(hash);

        if (secretsToShare.fills.length) {
          for (const { idx } of secretsToShare.fills) {
            await sdk.submitSecret(hash, secrets[idx])

            console.log({ idx }, 'shared secret')
          }
        }

        // check if order finished  
        const { status } = await sdk.getOrderStatus(hash)

        if (
          status === OrderStatus.Executed ||
          status === OrderStatus.Expired ||
          status === OrderStatus.Refunded
        ) {
          break
        }

        await sleep(1000)
      } catch (e) {
        console.error(e);
      } finally {
        console.log('Done');
      }

    }

    const statusResponse = await sdk.getOrderStatus(hash)
    console.log(statusResponse)
  } catch (error) {
    console.log(error)
  }
};


function getSupportedChainByValue(enumValue) {
  switch (enumValue) {
    case SupportedChains[0]:
      return SupportedChains[0];
    case SupportedChains[1]:
      return SupportedChains[1];
    case SupportedChains[2]:
      return SupportedChains[2];
    case SupportedChains[3]:
      return SupportedChains[3];
    case SupportedChains[4]:
      return SupportedChains[4];
    case SupportedChains[5]:
      return SupportedChains[5];
    case SupportedChains[6]:
      return SupportedChains[6];
    case SupportedChains[7]:
      return SupportedChains[7];
    case SupportedChains[8]:
      return SupportedChains[8];
    default:
      return ERR_VALIDATION
  }
}