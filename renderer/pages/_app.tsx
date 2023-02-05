import "../styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const MyApp = function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CHAT</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
