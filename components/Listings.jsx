import ListingItem from "./ListingItem";
import dayjs from "dayjs";
import { useContext } from "react";
import { ListingsContext } from "../context/ListingsContext";
import {useSelector} from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Listings() {
  // const { filteredListings } = useContext(ListingsContext);
  const filteredListings = useSelector(state => state.listings);
  console.log(717, filteredListings);
  const myDate = function (date) {
    return dayjs(date).fromNow();
  };

  const parsedListings = filteredListings?.map((listing) => {
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
  return (
    <div className=" bg-[#f7f9fb] pt-[25px] pb-[75px] pr-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 ">
      {parsedListings}
    </div>
  );
}
