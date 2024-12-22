import { useState, useEffect } from "react";

const useSearch = ({setFilteredListings, listings}) => {
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (searchValue) => {
    setFilteredListings(
      listings.filter((listing) => {
        if (!searchValue) return true;
        return listing.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    );
  };

  return {
    onSearch,
    searchValue,
    setSearchValue,
  };
};

export default useSearch;