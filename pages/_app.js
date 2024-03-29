import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import store from "../redux/store";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Head>
          <title>Up4Grabs</title>
          <meta name="description" content="Generated by create next app" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* <link rel="icon" href="/favicon.ico" />
        <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
        rel="stylesheet"
      /> */}
        </Head>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
