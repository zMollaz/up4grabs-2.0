import { useState, useContext, useRef } from "react";
import { ListingsContext } from "../context/ListingsContext";
import { DataContext } from "../context/DataContext";
import { useSession, getSession } from "next-auth/react";
import onClickOutside from "react-onclickoutside";
import Restricted from "../components/Restricted";

const New = ({ handleClickNew, setDisplay, newDisplay }) => {
  const { addListing } = useContext(ListingsContext);
  const { user } = useContext(DataContext);
  const defaultState = {
    title: "",
    description: "",
    img_src: "",
    end_date: "",
    postal_code: "",
  };

  const [state, setState] = useState(defaultState);
  // const [PopUp, setPopUp] = useState(false);
  const restrictedDiv = useRef(null);
  // const popUpHidden = PopUp ? "hidden" : "";

  New.handleClickOutside = () => {
    setDisplay((prev) => !prev);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const newState = { ...state, [name]: value };
    setState(newState);
  };

  const saveListing = async (e) => {
    e.preventDefault();
    if (user) {
      const response = await fetch("/api/new", {
        body: JSON.stringify({ state, user }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
      });

      const newListing = await response.json();
      setState(defaultState);
      setDisplay((prev) => !prev);
      addListing(newListing);
    }
  };

  const imageToBase64 = (img) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const saveImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const savedImage = e.target.files[0];
      const convertedImage = await imageToBase64(savedImage);
      const parsedImage = convertedImage.split(",")[1];
      setState({ ...state, img_src: parsedImage });
    }
  };
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    // return !popUpHidden && <Restricted ref={restrictedDiv} />;
    return <Restricted handleClickNew={handleClickNew} newDisplay={newDisplay}/>;
  }

  return (
    <div
      className={`fixed w-full h-full inset-0`}
    >
      <div
        onClick={handleClickNew}
        className="flex w-full h-full opacity-75 bg-t-gray fixed inset-0"
      ></div>
      <form
        onSubmit={saveListing}
        // className="center w-5/12 overflow-auto px-4 items-center pb-4 space-y-8 rounded-lg lg:px-8 sm:pb-6  bg-white fixed inset-24 "
        className="transform -translate-x-1/2 -translate-y-1/2 xs:h-[80%] xs:w-[80%] sm:max-w-md overflow-auto px-4 items-center pb-4 space-y-8 rounded-lg lg:px-8 sm:pb-6  bg-white  absolute top-[50%] left-[50%]"
        action="#"
      >
        <button
          onClick={handleClickNew}
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
        <div>
          <label
            htmlFor="title"
            className="block mt-6 font-bold text-sm text-gray-dark  "
          >
            Title
          </label>
          <input
            value={state.title}
            onChange={changeHandler}
            name="title"
            className="bg-white border-2 text-gray-dark  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="What's Up4Grabs?"
            required=""
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block font-bold text-sm text-gray-dark  "
          >
            Description
          </label>
          <textarea
            value={state.value}
            onChange={changeHandler}
            type="text"
            name="description"
            placeholder="Include important details about what's Up4Grabs! Do you need this item gone by a certain date? Dimensions? Weight? Pick up or meet-up only? New or used condition? Let other Grabbers know!"
            className="bg-gray-50 border-2 text-gray-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required=""
          />
        </div>
        <div>
          <label
            htmlFor="postal_code"
            className="block mt-6 font-bold text-sm  text-gray-dark  "
          >
            Postal Code
          </label>
          <input
            onChange={changeHandler}
            value={state.postal_code}
            name="postal_code"
            className="bg-gray-50 rounded-lg border-2 text-gray-dark  text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Let other Grabbers know the whereabouts of your Grab."
            required=""
          />
        </div>
        <div className="flex sm:justify-between sm:flex-row sm:itemscenter xs:flex-col xs:items-start">
          <div className="w-full">
            <label
              htmlFor="end_date"
              className="flow-root mt-2 font-bold text-sm text-gray-dark  "
            >
              Draw Date
            </label>
            <input
              onChange={changeHandler}
              value={state.end_date}
              name="end_date"
              className="bg-gray-50 font-bold rounded-lg border-2 text-gray-dark text-sm focus:ring-blue-500 focus:border-blue-500  xs:w-full sm:w-40 p-2.5"
              type="date"
              id="start"
              min="2020-01-01"
              max="2024-12-31"
            />
          </div>
          <div className="w-full sm:flex sm:justify-end">
            <select
              name="category_id"
              onChange={changeHandler}
              className="font-bold bg-gray-dark btn btn-sm mt-[42px] sm:ml-2 text-md xs:w-full sm:w-40 sm:h-[67px] rounded-md"
              defaultValue={0}
            >
              <option disabled value={0}>
                Category
              </option>
              <option value={1}>Furniture</option>
              <option value={2}>Toys/Games</option>
              <option value={3}>Electronics</option>
              <option value={4}>Home Appliances</option>
              <option value={5}>Books</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full rounded-lg bg-gray-50">
            <div className="">
              <label className=" font-bold text-gray-dark">File Upload</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded w-full h-32 border-4 border-gray-dark border-dashed hover:bg-gray-light hover:border-gray">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-dark group-hover:text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm font-bold tracking-wider text-gray-dark group-hover:textblack">
                      Attach a file
                    </p>
                  </div>
                  <input
                    onChange={saveImage}
                    // value={state.img_src}
                    type="file"
                    className="opacity-0"
                    name="img_src"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center p-2">
              <button className="w-full mt-3 sm:w-[70%] font-bold px-4 py-2 text-white bg-gray-dark rounded shadow-xl">
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => New.handleClickOutside,
};

export default onClickOutside(New, clickOutsideConfig);
