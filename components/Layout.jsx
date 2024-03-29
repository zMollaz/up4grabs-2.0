import Navbar from "./Navbar";
import Footer from "../components/Footer";

export default function Layout({
  children,
  users,
  setTimeUp,
  winner,
  listingItem,
  onSearch,
  searchValue,
  setSearchValue,
}) {

  return (
    <div className="font-zen bg-grey w-full h-full">
      <Navbar onSearch={onSearch} searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="flex flex-col">{children}</div>
      <Footer
        setTimeUp={setTimeUp}
        winner={winner}
        users={users}
        listingItem={listingItem}
      />
    </div>
  );
}
