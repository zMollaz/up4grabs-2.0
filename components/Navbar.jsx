import Link from "next/link";
import New from "../components/New";
import { useState, useContext, useRef } from "react";
import { ListingsContext } from "../context/ListingsContext";
import { UsersContext } from "../context/UsersContext";
import onClickOutside from "react-onclickoutside";

const Navbar = () => {
  const { onSearch, searchValue, setSearchValue } = useContext(ListingsContext);
  const { users, user, switchUser, loaded } = useContext(UsersContext); //with this line can import into any component and access users/ state level step-up
  // const [searchValue, setSearchValue] = useState("");
  const [newDisplay, setNewDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  const [hideUserIcon, setHideUserIcon] = useState(user ? true : false);
  const [hideUserList, setHideUserList] = useState(user ? false : true);
  const [hideSearchBar, setHideSearchBar] = useState(true);
  const [hideLogo, setHideLogo] = useState(false);

  const searchInput = useRef(null);

  const handleClickNew = () => {
    setNewDisplay((prev) => !prev);
  };

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  Navbar.handleClickOutside = () => {
    setShowDropdown(true);
  };

  const handleCLickUserIcon = () => {
    setHideUserIcon((prev) => !prev);
    setHideUserList((prev) => !prev);
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
  const userIconHidden = hideUserIcon ? "hidden" : "";
  const userListHidden = hideUserList ? "hidden" : "";
  const searchBarHidden = hideSearchBar ? "hidden" : "";
  const logoHidden = hideLogo ? "hidden" : "";

  const userList = users.map((oneUser) => {
    return (
      <option value={oneUser.id} key={oneUser.id} className="user-option">
        {oneUser.name}
      </option>
    );
  });

  return (
    <div
      onClick={handleClickNav}
      className="navbar rounded sticky flex top-0 z-index shadow-lg bg-gray-dark text-off-white"
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
        className={`${isHidden} mobile-menu flex-col mobile-dropDown items-center`}
      >
        <div className="">
          <label htmlFor="select-user">
            <a
              onClick={handleCLickUserIcon}
              className={`xs:${userIconHidden} sm:${userIconHidden} md:hidden lg:hidden btn input input-ghost btn-sm rounded-btn mb-1.5`}
            >
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </a>
          </label>
          {loaded && (
            <select
              name="users"
              onChange={(e) => {
                switchUser(e.target.value);
              }}
              className={`xs:${userListHidden} sm:${userListHidden} md:hidden lg:hidden text-white w-20 btn btn-sm input input-ghost mb-1.5`}
              value={user.id}
            >
              <option value="0" className="" disabled>
                Switch user
              </option>
              {userList}
            </select>
          )}
        </div>
        <ul className="">
          <li>
            <Link href="#listings">
              <a className="btn input input-ghost btn-sm rounded-btn mb-1.5">
                <svg
                  className="w-7 h-7  text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />{" "}
                  <rect x="9" y="3" width="6" height="4" rx="2" />{" "}
                  <line x1="9" y1="12" x2="9.01" y2="12" />{" "}
                  <line x1="13" y1="12" x2="15" y2="12" />{" "}
                  <line x1="9" y1="16" x2="9.01" y2="16" />{" "}
                  <line x1="13" y1="16" x2="15" y2="16" />
                </svg>
              </a>
            </Link>
          </li>
          <Link href="/users/likes">
            <a className=" btn input input-ghost btn-sm rounded-btn mb-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-7 h-7  hover:fill-red hover:text-red stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </a>
          </Link>
        </ul>
        <a
          onClick={handleClickNew}
          className=" btn input input-ghost btn-sm rounded-btn mb-1.5 mx-2"
        >
          <svg
            className="h-7 w-7 text-white "
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
      </div>

      {/* large-screen size */}

      <div
        className={`xs:${logoHidden} sm:inline-flex md:inline-flex  pr-2 mr-2`}
      >
        <Link href="/">
          <a className="text-4xl md:text-3xl lg:text-4xl xs:text-2xl mt-2 ml-2 font-lucky font- font-bold">
            Up4Grabs
          </a>
        </Link>
      </div>
      {newDisplay && (
        <New handleClick={handleClickNew} setDisplay={setNewDisplay} />
      )}

      <div className="flex-1">
        <div className="items-stretch flex">
          <Link href="#listings">
            <a className="xs:hidden sm:hidden md:hidden lg:inline btn input input-ghost btn-sm rounded-btn font-bold">
              Listings
            </a>
          </Link>
          <Link href="/users/likes">
            <a className="xs:hidden sm:hidden md:hidden lg:inline btn input input-ghost btn-sm rounded-btn mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-2 inline-block w-7 h-7  hover:fill-red hover:text-red stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </a>
          </Link>

          <a
            onClick={handleClickNew}
            className="xs:hidden sm:hidden md:hidden lg:inline btn input input-ghost btn-sm rounded-btn"
          >
            <svg
              className="mt-0.5 h-7 w-7 text-white "
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
        </div>
      </div>
      <div className=" ">
        <div className="form-control">
          <input
            ref={searchInput}
            placeholder="Search"
            defaultValue={searchValue}
            onClick={clickableOutsideInput}
            onBlur={handleOnBlurSearchInput}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onSearch(searchValue);
              if (e.target.value === "") {
                onSearch("");
              }
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                onSearch(searchValue);
              }
            }}
            type="text"
            // placeholder="Search"
            className={`ml-2 mr-2 xs:${searchBarHidden} xs:w-60 sm:w-28 md:w-24 lg:w-[90%] sm:inline-flex md:inline-flex lg:inline-flex focus:bg-white text-white btn btn-sm input input-ghost h-7`}
          />
        </div>
        {/* for the search icon copy the starting a tag till the ending a tag  */}
        <a
          onClick={handleCLickSearchIcon}
          className="btn btn-sm input input-ghost lg:mr-5 xs:mr-0 xs:justify-self-end"
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
      </div>
      <div>
        <div className="md:flex lg:flex xs:hidden sm:hidden">
          <label htmlFor="select-user">
            <svg
              className="mb-50 h-6 w-6 text-white mt-1 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </label>
          {loaded && (
            <select
              name="users"
              onChange={(e) => {
                switchUser(e.target.value);
              }}
              className=" text-white w-fit btn btn-sm input input-ghost"
              value={user.id}
            >
              <option value="0" className="" disabled>
                Switch user
              </option>
              {userList}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => Navbar.handleClickOutside,
};

export default onClickOutside(Navbar, clickOutsideConfig);
