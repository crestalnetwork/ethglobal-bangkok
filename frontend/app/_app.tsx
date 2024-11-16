import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main>
            <NextUIProvider>
                <Component {...pageProps} />
            </NextUIProvider>
        </main>
    );
}
