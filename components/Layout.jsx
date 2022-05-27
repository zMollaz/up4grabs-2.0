import Navbar from "./Navbar";
import Footer from "../components/Footer";

export default function Layout({ children, setTimeUp, winner, users, listingItem }) {
  return (
    <div className="font-zen bg-grey w-full h-full">
   
      <Navbar />
      <div className="flex flex-col">{children}</div>
      <Footer setTimeUp={setTimeUp} winner={winner} users={users} listingItem={listingItem} />
    </div>
  );
}
