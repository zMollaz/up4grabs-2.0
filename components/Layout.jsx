import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "../components/Footer";

export default function Layout({ children, setTimeUp, winner, listingItem }) {
  return (
    <div className="font-zen bg-grey w-full h-full">
      <Head>
        <title>Up4Grabs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="flex flex-col">{children}</div>
      <Footer setTimeUp={setTimeUp} winner={winner} listingItem={listingItem}/>
    </div>
  );
}
