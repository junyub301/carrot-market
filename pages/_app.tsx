import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
    console.log("App IS RUNNING");

    return (
        <SWRConfig
            value={{
                fetcher: (url: string) =>
                    fetch(url).then((response) => response.json()),
            }}
        >
            <div className='w-full max-w-xl mx-auto'>
                <Component {...pageProps} />
            </div>
            {/* 
                beforeInteractive : 페이지를 다 불러와 상호작용 하기 전에 스크립트를 불러온다.
                afterInteractive : 페이지를 먼저 다 불러온 후 스크립트를 불러온다.
                lazyOnload : 스크립트를 불러오지만 최우선은 아니다.
            */}
            <Script
                src='https://developers.kakao.com/sdk/js/kakao.js'
                strategy='lazyOnload'
            />
            <Script src='https://connect.facebook.net/en_US/sdk.js' onLoad={() => {
                 window.fbAsyncInit = function() {
                    FB.init({
                      appId            : 'your-app-id',
                      autoLogAppEvents : true,
                      xfbml            : true,
                      version          : 'v13.0'
                    });
                  };/>
        </SWRConfig>
    );
}

export default MyApp;
