import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import ModalsProvider from "@libs/context/modalProvider";

function MyApp({ Component, pageProps }: AppProps) {
    console.log("App IS RUNNING");

    return (
        <SWRConfig
            value={{
                fetcher: (url: string) =>
                    fetch(url).then((response) => response.json()),
            }}
        >
            <ModalsProvider>
                <div className='w-full max-w-xl mx-auto'>
                    <Component {...pageProps} />
                </div>
            </ModalsProvider>
        </SWRConfig>
    );
}

export default MyApp;
