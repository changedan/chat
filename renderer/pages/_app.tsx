import "../styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const MyApp = function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Chatting</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
