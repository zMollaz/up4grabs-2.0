import { useState } from "react";

const useListings = ({ defaultListings, defaultLikes }) => {
  
  const [listings, setListings] = useState(defaultListings);
  const [bidding, setBidding] = useState(false);
  const [likes, setLikes] = useState(defaultLikes);

  const addListing = (response) => {
    // setListings((prev) => [...prev, response.savedListing]);
    setListings((prev) => [response.savedListing, ...prev]);
  };

  return {
    listings,
    addListing,
    bidding,
    setBidding,
    likes,
    setLikes,
  };
};

export default useListings;
