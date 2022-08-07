// import { useState, useEffect } from "react";

// const useListings = ({ defaultListings, defaultLikes }) => {
//   const [listings, setListings] = useState(defaultListings);
//   const [filteredListings, setFilteredListings] = useState(defaultListings);
//   const [bidding, setBidding] = useState(false);
//   const [likes, setLikes] = useState(defaultLikes);
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     setFilteredListings(listings);
//   }, [listings, setFilteredListings]);

//   const onSearch = (searchValue) => {
//     setFilteredListings(
//       listings.filter((listing) => {
//         if (!searchValue) return true;
//         return listing.title.toLowerCase().includes(searchValue.toLowerCase());
//       })
//     );
//   };

//   const addListing = (response) => {
//     // setListings((prev) => [...prev, response.savedListing]);
//     setListings((prev) => [response.savedListing, ...prev]);
//   };

//   return {
//     listings,
//     filteredListings,
//     setFilteredListings,
//     onSearch,
//     addListing,
//     bidding,
//     setBidding,
//     likes,
//     setLikes,
//     searchValue,
//     setSearchValue,
//   };
// };

// export default useListings;
