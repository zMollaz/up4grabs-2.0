import Link from "next/link";
import Auth from "../components/Auth";
import { useRouter } from "next/router";

const Restricted = ({ handleClickNew, setShowRestricted, newDisplay }) => {
  const router = useRouter();

  let url;
  if (router.asPath === "/") {
    url = "";
  }
  if (router.asPath === "/users/likes") {
    url = "/";
  }
  if (router.pathname === `/listings/[id]`) {
    url = {
      pathname: '/listings/[id]',
      query: router.query,
    };

  }

  const clickHandler = () => {
    if (router.pathname === `/listings/[id]`) {
      newDisplay ? handleClickNew() : setShowRestricted(prev => !prev);
    }
    if (router.asPath === "/users/likes") {
      return;
    }
    if (router.asPath === "/") {
      handleClickNew();
    }

  };

  return (
    <div className="z-50 transform -translate-x-1/2 -translate-y-1/2 top-[30%] left-[50%] flex-col items-center justify-center mt-0 text-gray-dark text-4xl md:text-3xl lg:text-4xl xs:text-2xl fixed inset-0 md:max-w-md xs:h-[30%] opacity-[95%] xs:w-[80%] text-center rounded-lg bg-white">
      <Link href={url}>
      {/* <Link href="/listings/7"> */}
        <a className="text-4xl md:text-3xl lg:text-4xl xs:text-2xl mt-2 ml-2 font-lucky font-bold">
          {/* Up4Grabs */}
          <button
            onClick={clickHandler}
            type="button"
            className="text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center absolute right-0 top-0"
          >
            <svg
              className="w-7 h-7 bg-gray-dark rounded-lg"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </a>
      </Link>
      <h1 className="text-red  mb-1 pr-5 font-lucky">
        You must be signed in to view this content !
      </h1>
      <Auth />
    </div>
  );
};

export default Restricted;
