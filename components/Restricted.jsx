import Auth from "../components/Auth";
const Restricted = ({ handleClickNew }) => {
  return (
    // fixed top-[10%] left-[10%]
    <div className="transform -translate-x-1/2 -translate-y-1/2 top-[30%] left-[50%] flex-col items-center justify-center mt-0 text-gray-dark text-4xl md:text-3xl lg:text-4xl xs:text-2xl fixed inset-0 md:max-w-md xs:h-[30%] opacity-[95%] xs:w-[80%]  text-center px-4 pb-4 rounded-lg lg:px-8 sm:pb-6  bg-white">
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
      <h1 className="text-red mt-6 mb-8 pr-5">You must be signed in to view this content !</h1>
      <Auth/>
    </div>
  );
};

export default Restricted;
