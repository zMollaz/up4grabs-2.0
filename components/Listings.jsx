import ListingItem from "./ListingItem";
import dayjs from "dayjs";
import { useContext } from "react";
import { ListingsContext } from "../context/ListingsContext";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function Listings() {
  const { filteredListings } = useContext(ListingsContext);

  const myDate = function (date) {
    const startDate1 = dayjs().format('YYYY-MM-DDTHH:mm:ss')
    const startDate2 = dayjs.utc().format('YYYY-MM-DDTHH:mm:ss')
    console.log(111, startDate1);
    console.log(222, startDate2);
    
    return dayjs(date).fromNow();
  };

  const parsedListings = filteredListings.map((listing) => {
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
