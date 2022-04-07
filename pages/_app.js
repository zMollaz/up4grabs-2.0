import "../styles/globals.css";
import useUsers from "../hooks/useUsers";
import { UsersContext } from "../context/UsersContext";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <UsersContext.Provider value={useUsers()}>
      <Head>
        <title>Up4Grabs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
          rel="stylesheet"
        /> */}
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </UsersContext.Provider>
  );
};

export default MyApp;
