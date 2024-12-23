import Link from "next/link";
import New from "../components/New";
import { useState, useRef, useEffect } from "react";
import Auth from "../components/Auth";
import { useSession } from "next-auth/react";
import useSearch from "../hooks/useSearch";
import { useRouter } from "next/router"; // Import useRouter

// Custom hook to handle clicks outside
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const Navbar = ({ listings, setFilteredListings }) => {
  const { data: session, status } = useSession();
  const user = session?.user.name;

  // New hook to check the current route
  const router = useRouter();
  const [newDisplay, setNewDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  const [hideSearchBar, setHideSearchBar] = useState(true);
  const [hideLogo, setHideLogo] = useState(false);
  const { onSearch, searchValue, setSearchValue } = useSearch({
    listings,
    setFilteredListings,
  });
  const searchInput = useRef(null);
  const dropdownRef = useRef(null); // Ref for dropdown
  const searchInputRef = useRef(null); // Ref for search input

  // Handle click outside for dropdown
  useOnClickOutside(dropdownRef, () => setShowDropdown(true));
  useOnClickOutside(searchInputRef, () => setHideSearchBar(true));

  const handleClickNew = () => {
    setNewDisplay((prev) => !prev);
  };

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleCLickSearchIcon = () => {
    onSearch(searchValue);
    setHideSearchBar((prev) => !prev);
    setHideLogo((prev) => !prev);
    setTimeout(() => {
      searchInput.current.focus();
    }, 50);
  };

  const handleOnBlurSearchInput = () => {
    setHideSearchBar((prev) => !prev);
    setHideLogo((prev) => !prev);
  };

  const handleOnBlurDropDown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickNav = () => {
    if (hideLogo) {
      setHideSearchBar((prev) => !prev);
      setHideLogo((prev) => !prev);
    }
  };

  const clickableOutsideInput = (e) => {
    e.stopPropagation();
  };

  const isHidden = showDropdown ? "hidden" : "";
  const searchBarHidden = hideSearchBar ? "hidden" : "";
  const logoHidden = hideLogo ? "hidden" : "";

  // Check if the current route is the listing page
  const isListingPage = router.pathname === "/listings/[id]";
  console.log("isListingPage:", isListingPage);

  // If it's the listing page, hide the search bar
  useEffect(() => {
    if (isListingPage) {
      setHideSearchBar(true); // Hide search bar on listing page
    } else {
      setHideSearchBar(false); // Show search bar on other pages
    }
  }, [router.asPath]); // Run this whenever the pathname changes

  return (
    <div
      onClick={handleClickNav}
      className="navbar sticky rounded-b flex top-0 z-50 shadow-lg bg-gray-dark text-off-white"
    >
      <div className="lg:hidden flex items-center ml-2">
        <button
          onClick={handleDropdown}
          className="pr-2 outline-none mobile-menu-button"
        >
          <svg
            className="w-6 h-6 text-gray-500"
            x-show="!showMenu"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {/* Mobile menu  */}
      <div
        onBlur={handleOnBlurDropDown}
        className={`${isHidden} flex-col h-full w-[50%] max-w-[300px] fixed top-14  left-0 bg-gray-dark items-start`}
      >
        <div className="">
          <Link
            href="/users/likes"
            className=" btn input input-ghost btn-xs rounded-btn mb-1.5 mt-5"
          >
            <p className="text-base">Biddings</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="ml-1 inline-block w-6 h-6  hover:fill-red hover:text-red stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </Link>
        </div>
        <a
          onClick={handleClickNew}
          className=" btn input input-ghost btn-xs rounded-btn "
        >
          <p className="text-base">Upload</p>
          <svg
            className="ml-1 h-6 w-6 text-white hover:text-orange"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />{" "}
            <line x1="12" y1="8" x2="12" y2="16" />{" "}
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </a>
        <div className="ml-2 text-base">
          <Auth />
        </div>
      </div>

      {/* large-screen size */}

      <div
        className={`xs:${logoHidden} sm:inline-flex md:inline-flex  pr-2 mr-2`}
      >
        <Link
          href="/"
          className="text-4xl md:text-3xl lg:text-4xl xs:text-2xl mt-2 ml-2 font-lucky font-bold"
        >
          Up4Grabs
        </Link>
      </div>
      {newDisplay && (
        <New
          handleClickNew={handleClickNew}
          setDisplay={setNewDisplay}
          newDisplay={newDisplay}
        />
      )}

      <div className="flex-1">
        <div className="flex items-center w-max">
          <Link
            href="/users/likes"
            className="btn input input-ghost btn-sm xs:hidden sm:hidden md:hidden lg:flex lg:items-center lg:mt-2 font-bold rounded-btn px-1  lg:ml-2 lg:mr-2 lg:text-base"
          >
            Biddings
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className=" w-7 h-7  hover:fill-red hover:text-red stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </Link>

          <a
            onClick={handleClickNew}
            className="btn input input-ghost btn-sm xs:hidden sm:hidden md:hidden lg:flex lg:items-center lg:mt-2 font-bold rounded-btn px-1 lg:text-base"
          >
            Upload
            <svg
              className="pt-0.5 h-7 w-7 text-white  hover:text-orange "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />{" "}
              <line x1="12" y1="8" x2="12" y2="16" />{" "}
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            {/* <p className="w-max btn input input-ghost btn-sm">Add listing</p> */}
          </a>
        </div>
      </div>
      <input
        ref={searchInput}
        placeholder="Search"
        onClick={clickableOutsideInput}
        onBlur={handleOnBlurSearchInput}
        defaultValue={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          onSearch(searchValue);
          if (e.target.value === "") {
            onSearch(searchValue);
          }
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            onSearch(searchValue);
          }
        }}
        type="text"
        className={`${searchBarHidden} ml-2 mr-2 xs:w-[80%] sm:w-28 md:w-24 lg:w-[15vw] lg:mt-2 focus:bg-white focus:text-black text-white btn btn-sm input input-ghost h-7`}
      />
      {/* for the search icon copy the starting a tag till the ending a tag  */}
      <a
        onClick={handleCLickSearchIcon}
        className={`${searchBarHidden} btn btn-sm input input-ghost lg:mt-2 lg:mr-5 xs:mr-0 xs:justify-self-end px-1`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </a>

      <div className="md:ml-2 lg:ml-0 md:hidden lg:flex xs:hidden sm:hidden">
        <Auth />
      </div>
    </div>
  );
};

export default Navbar;
