import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export function getConfig() {
    return createConfig({
        chains: [base],
        connectors: [
            coinbaseWallet({
                appName: "OnchainKit",
                preference: 'smartWalletOnly',
                version: '4',
            }),
        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: false,
        transports: {
            [base.id]: http(),
        },
    });
}

declare module 'wagmi' {
    interface Register {
        config: ReturnType<typeof getConfig>;
    }
}