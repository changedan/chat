import "../styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

const MyApp = function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CHAT</title>
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default MyApp;
