import Layout from "../components/Layout";
import Header from "../components/Header";
import Listings from "../components/Listings";
import PageBreak from "../components/PageBreak";
import prisma from "../lib/prisma";
import { ListingsContext } from "../context/ListingsContext";
import useListings from "../hooks/useListings";

export const getServerSideProps = async () => {
  const defaultListings = await prisma.listings.findMany();
  const dbUsers = await prisma.user.findMany();
  console.log(111, dbUsers)
  // const users = JSON.parse(JSON.stringify(dbUsers))
  const users = JSON.stringify(dbUsers)
  console.log(222, users)

  return {
    props: { defaultListings, users },
  };
};
//add somehting like Array.isArayy && map function
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
