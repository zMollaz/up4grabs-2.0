import Layout from "../components/Layout";
import Header from "../components/Header";
import Listings from "../components/Listings";
import PageBreak from "../components/PageBreak";
import prisma from "../lib/prisma";
import { ListingsContext } from "../context/ListingsContext";
import useListings from "../hooks/useListings";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import { getUsersAsync } from "../redux/usersSlice";

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
    props: { defaultListings, 
      // users 
    },
  };
};
//add something like Array.isArayy && map function
export default function Home(props) {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch((getUsersAsync()));
  }, [dispatch]);

  return (
    <ListingsContext.Provider value={useListings(props)}>
      <Layout users={users}>
        <Header />
        <PageBreak />
        <Listings />
      </Layout>
    </ListingsContext.Provider>
  );
}
