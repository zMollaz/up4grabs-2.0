import ListingItem from "../../components/ListingItem";
import Layout from "../../components/Layout";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import prisma from "../../lib/prisma";
import { useEffect, useState } from "react";
import { ListingsContext } from "../../context/ListingsContext";
import useListings from "../../hooks/useListings";
import { getSession, useSession } from "next-auth/react";
import Restricted from "../../components/Restricted";

export const getServerSideProps = async (context) => {
  const defaultListings = await prisma.listings.findMany();
  const defaultLikes = await prisma.biddings.findMany();
  const dbUsers = await prisma.user.findMany();
  const users = JSON.parse(JSON.stringify(dbUsers));

  return {
    props: {
      session: await getSession(context),
      defaultListings,
      defaultLikes,
      users,
    },
  };
};

export default function UserLikes(props) {
  const { data: session, status } = useSession();
  
  const user = props.users.find((user) => user.email === session?.user.email);
  
  const listingsHook = useListings(props);
  
  const [view, setView] = useState(props.defaultListings);
  
  const myDate = function (date) {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  };

  const filteredLikes = props.defaultLikes.filter(
    (like) => like.user_id === user?.id
  );

  useEffect(() => {
    const listingsArr = filteredLikes.map((like) => like.listing_id);
    const userListings = props.defaultListings.filter((listing) =>
      listingsArr.includes(listing.id)
    );
    setView(userListings);
  }, [user]);

  const parsedListings = view.map((listing) => {
    return (
      <ListingItem
        title={listing.title}
        img={listing.img_src}
        date={myDate(listing.start_date)}
        id={listing.id}
        key={listing.id}
      />
    );
  });

  if (typeof window === "undefined") return null;

  if (session) {
    return (
      <ListingsContext.Provider value={listingsHook}>
        <Layout>
          <div className="bg-off-white pr-8 flex-1 h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 ">
            {filteredLikes.length > 0 ? (
              parsedListings
            ) : (
              <div className="h-full w-full font-bold text-black">
                You currently have no biddings to display
              </div>
            )}
          </div>
        </Layout>
      </ListingsContext.Provider>
    );
  }

  return <Restricted />;
}
