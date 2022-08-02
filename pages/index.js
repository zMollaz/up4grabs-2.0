import Layout from "../components/Layout";
import Header from "../components/Header";
import Listings from "../components/Listings";
import PageBreak from "../components/PageBreak";
import prisma from "../lib/prisma";
import { ListingsContext } from "../context/ListingsContext";
import useListings from "../hooks/useListings";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersAsync } from "../redux/usersSlice";
import {getListingsAsync} from "../redux/listingsSlice";

export const getServerSideProps = async () => {
  const defaultListings = await prisma.listings.findMany({
    orderBy: [
      {
        start_date: "desc",
      },
    ],
  });
  // const dbUsers = await prisma.user.findMany();
  // const users = JSON.parse(JSON.stringify(dbUsers));

  return {
    props: { defaultListings },
  };
};
//add something like Array.isArayy && map function
export default function Home(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const defaultListings = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(getListingsAsync());
  }, [dispatch]);
  console.log(555, defaultListings);
  return (
    <ListingsContext.Provider value={useListings({defaultListings})}>
      <Layout users={users}>
        <Header />
        <PageBreak />
        <Listings />
      </Layout>
    </ListingsContext.Provider>
  );
}
