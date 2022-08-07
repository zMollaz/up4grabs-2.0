import ListingItem from "../../components/ListingItem";
import Layout from "../../components/Layout";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Restricted from "../../components/Restricted";
import { useSelector, useDispatch } from "react-redux";
import { getUsersAsync } from "../../redux/usersSlice";
import { getListingsAsync } from "../../redux/listingsSlice";
import { getLikesAsync } from "../../redux/likesSlice";

export default function UserLikes(props) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(getListingsAsync());
    dispatch(getLikesAsync());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const listings = useSelector((state) => state.listings);
  const likes = useSelector((state) => state.likes);
  const user = users.find((user) => user.email === session?.user.email);

  const [view, setView] = useState(listings);

  const myDate = function (date) {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  };

  const filteredLikes = likes.filter((like) => like.user_id === user?.id);

  useEffect(() => {
    const listingsArr = filteredLikes.map((like) => like.listing_id);
    const userListings = listings.filter((listing) =>
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
      <Layout users={users}>
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
    );
  }

  return <Restricted />;
}
