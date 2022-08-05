import Layout from "../components/Layout";
import Header from "../components/Header";
import Listings from "../components/Listings";
import PageBreak from "../components/PageBreak";
// import prisma from "../lib/prisma";
import { ListingsContext } from "../context/ListingsContext";
import useListings from "../hooks/useListings";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getUsersAsync } from "../redux/usersSlice";
import { getListingsAsync } from "../redux/listingsSlice";

// export const getServerSideProps = async () => {
// const defaultListings = await prisma.listings.findMany({
//   orderBy: [
//     {
//       start_date: "desc",
//     },
//   ],
// });
// const dbUsers = await prisma.user.findMany();
// const users = JSON.parse(JSON.stringify(dbUsers));

//   return {
//     props: { defaultListings },
//   };
// };
//add something like Array.isArayy && map function
export default function Home(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const defaultListings = useSelector((state) => state.listings);

  const [filteredListings, setFilteredListings] = useState(defaultListings);
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (searchValue) => {
    const filtered = defaultListings.filter((listing) => {
      if (searchValue === "") {
        return true;
      } else {
        return listing.title.toLowerCase().includes(searchValue.toLowerCase());
      }
    });
    setFilteredListings(filtered);
    return filtered;
  };

  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(getListingsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredListings(defaultListings);
  }, [defaultListings]);

  return (
    <ListingsContext.Provider value={useListings({ defaultListings })}>
      <Layout
        users={users}
        onSearch={onSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      >
        <Header />
        <PageBreak />
        <Listings filteredListings={filteredListings} />
      </Layout>
    </ListingsContext.Provider>
  );
}
