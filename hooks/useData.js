import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

const useData = () => {
  const [data, setData] = useState({});
  // const [listings, setListings] = useState(data.listings);
  // const [filteredListings, setFilteredListings] = useState(data.listings);
  // const [bidding, setBidding] = useState(false);
  // const [biddings, setBiddings] = useState(data.likes);
  // const [searchValue, setSearchValue] = useState("");

  // const onSearch = (searchValue) => {
  //   setFilteredListings(
  //     listings.filter((listing) => {
  //       if (!searchValue) return true;
  //       return listing.title.toLowerCase().includes(searchValue.toLowerCase());
  //     })
  //   );
  // };

  // const addListing = (response) => {
  //   setListings((prev) => [response.savedListing, ...prev]);
  // };

  const dataGetter = async () => {
    const dbUsers = await axios.get("/api/users");
    const users = dbUsers.data.users;

    const session = await getSession();
    const user = users.find((user) => user.email === session?.user.email);

    const dbListings = await axios.get("/api/listings");
    const listings = dbListings.data.listings;

    const dbLikes = await axios.get("/api/likes");
    const likes = dbLikes.data.likes;
    // const allData = {user, users, listings, likes};
  
    setData({ user, users, listings, likes });
  };

  useEffect(() => {
    dataGetter();
  }, []);

  // useEffect(() => {
  //   setFilteredListings(listings);
  // }, [listings, setFilteredListings]);
  const { user, users, likes, listings } = data;

  return {
    user,
    users,
    likes,
    listings,
    // filteredListings,
    // setFilteredListings,
    // onSearch,
    // addListing,
    // bidding,
    // setBidding,
    // biddings,
    // setBiddings,
    // searchValue,
    // setSearchValue,
  }; // this is what's in the context app.js
};

export default useData;
