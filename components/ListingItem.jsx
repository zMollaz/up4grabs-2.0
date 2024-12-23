import Link from "next/link";

export default function Listings(props) {
  const { title, img, date, id } = props;

  return (
    <Link href={`/listings/${id}`}>
        <div className="bg-off-white w-full shadow-md hover:shadow-2xl mx-4 rounded-lg">
          <header>
            <img src={img} className="rounded-lg object-cover h-60 w-full" />
          </header>
          <div className="relative text-center px-1 pt-1 h-[140px] flex flex-col items-center justify-between">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 text-black">
              {title}
            </h5>

            <footer className=" absolute bottom-0 flex flex-col right-0 w-full">
              <div className="bg-gray-light px-1 mb-1 mr-1 w-xs font-bold text-sm rounded-lg overflow-hidden shadow-lg text-center text-black self-end ">
                {date}
              </div>
            </footer>
          </div>
        </div>
    </Link>
  );
}
