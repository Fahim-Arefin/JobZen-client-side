import { FiSearch } from "react-icons/fi";

function Banner() {
  return (
    <div
      data-aos="fade-right"
      className="mt-2 relative h-[450px] md:h-[800px] flex justify-center items-center bg-[url('/banner3.jpg')] 
          bg-no-repeat bg-cover bg-center mb-24"
    >
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 lg:space-y-4 z-20">
        <h1
          className="text-2xl md:text-3xl lg:text-5xl font-bold text-center
          bg-gradient-to-r from-purple-300 to-[#14c0c3] text-transparent bg-clip-text"
        >
          JobZen: Where Careers Take Flight.
        </h1>

        <span
          className="text-sm md:text-lg lg:text-xl font-semibold mx-5 text-center
              bg-gradient-to-r from-gray-100 to-blue-200 text-transparent bg-clip-text "
        >
          - Unlock Your Career Potential with JobZen: Where Opportunities Find
          You!
        </span>
        <div className="w-[80%] relative flex">
          <input
            className="w-[80%] h-12 rounded-md outline-none px-8 py-4"
            type="text"
            name=""
            id=""
            placeholder="search jobs"
          />
          <FiSearch className="absolute top-3 text-xl right-36" />
          <button
            className="px-4 py-2 h-12 text-white border border-white rounded-md ml-2
          hover:bg-white hover:text-black transition-all duration-150"
          >
            Search
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gray-700 opacity-10 z-10"></div>
    </div>
  );
}

export default Banner;
