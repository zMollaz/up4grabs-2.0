import { useState } from "react";

const useListings = ({ defaultListings, defaultLikes }) => {
  const [listings, setListings] = useState(defaultListings);
  const [bidding, setBidding] = useState(false);
  const [likes, setLikes] = useState(defaultLikes);
  F;
  return {
    listings,
    bidding,
    setBidding,
    likes,
    setLikes,
  };
};

export default useListings;
