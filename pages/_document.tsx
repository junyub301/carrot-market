import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
    render(): JSX.Element {
        console.log("DOCUMENT IS RUNNING");
        return (
            <Html lang='ko'>
                <Head>
                    <link
                        href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&family=Poppins:ital,wght@1,300&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
