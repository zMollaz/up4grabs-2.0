import Layout from "../../components/Layout";
import Listings from "../../components/Listings";
import Restricted from "../../components/Restricted";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersAsync } from "../../redux/usersSlice";
import { getListingsAsync } from "../../redux/listingsSlice";
import { getLikesAsync } from "../../redux/likesSlice";

export default function UserLikes(props) {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.email === session?.user.email);
  const listings = useSelector((state) => state.listings);
  const likes = useSelector((state) => state.likes);
  const userLikes = likes.filter((like) => like.user_id === user?.id);
  const likesIdArr = userLikes.map((like) => like.listing_id);
  const userLikedListings = listings.filter((listing) =>
    likesIdArr.includes(listing.id));
  const [filteredLikes, setFilteredLikes] = useState(userLikedListings);

  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(getListingsAsync());
    dispatch(getLikesAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredLikes(userLikedListings);
  }, [user, users, likes, listings]);

  if (typeof window === "undefined") return null;

  if (session) {
    return (
      <Layout users={users}>
        {filteredLikes.length > 0 ? (
          <Listings filteredListings={filteredLikes} />
        ) : (
          <div className="h-full w-full font-bold text-black">
            You currently have no biddings to display
          </div>
        )}
      </Layout>
    );
  }

  return <Restricted />;
}
