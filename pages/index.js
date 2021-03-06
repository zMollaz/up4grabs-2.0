import Layout from "../components/Layout";
import Header from "../components/Header";
import Listings from "../components/Listings";
import PageBreak from "../components/PageBreak";
import prisma from "../lib/prisma";
import { ListingsContext } from "../context/ListingsContext";
import useListings from "../hooks/useListings";

export const getServerSideProps = async () => {
  const defaultListings = await prisma.listings.findMany({
    orderBy: [
      {
        start_date: "desc",
      },
    ],
  });
  const dbUsers = await prisma.user.findMany();
  const users = JSON.parse(JSON.stringify(dbUsers));

  return {
    props: { defaultListings, users },
  };
};
//add something like Array.isArayy && map function
export default function Home(props) {
  return (
    <ListingsContext.Provider value={useListings(props)}>
      <Layout>
        <Header />
        <PageBreak />
        <Listings />
      </Layout>
    </ListingsContext.Provider>
  );
}
