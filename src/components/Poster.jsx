function Poster() {
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 my-24 gap-6 xl:h-[600px]">
      <div className="col-span-1 w-full md:w-[450px] h-[500px] mx-auto relative">
        <img src="poster.jpg" alt="" className="w-full h-full" />
        <div
          className="absolute w-full md:w-[280px] h-[170px] -bottom-5 lg:-bottom-10 lg:-right-20 bg-[#fefefe] rounded-lg
        flex flex-col p-12 text-[18px] font-semibold text-[#2b3940] tracking-wide shadow-2xl"
        >
          <div className="space-x-2">
            <span className="">
              <span className=" text-2xl">F</span>ound
            </span>{" "}
            <span className="text-xl text-red-500">290+</span>
            <span>Jobs</span>
          </div>
          <div className="flex  mt-2 items-center justify-between">
            <div className="flex space-x-1">
              <img className="h-8 w-8" src="/company1.png" alt="" />
              <img className="h-8 w-8" src="/company2.png" alt="" />
            </div>
            <span className="text-[#2b3940] text-[16px] tracking-wider">
              <span className="text-lg">+14</span> Giants
            </span>
          </div>
        </div>
        <div className="hidden xl:block absolute bottom-[78px] right-[155px] z-40">
          <img src="/tick2.png" alt="" />
        </div>
      </div>
      <div className="col-span-1 flex flex-col mt-32 xl:mt-12 space-y-12 items-center xl:items-start">
        <h1 className="text-[#2b3940] text-3xl lg:text-4xl xl:text-5xl tracking-wide font-bold space-y-2">
          <h1>Help you to get the </h1>
          <h1>best job that fits you</h1>
        </h1>
        <p className="text-[#7f8283] text-xl md:text-2xl text-center xl:text-start">
          Leverage agile frameworks to provide a robust <br /> synopsis for high
          level overviews. Iterative approach
        </p>
        <div className="text-[#323f46] text-lg md:text-xl font-semibold tracking-wide space-y-2">
          <div className="flex space-x-4 items-center">
            <img className="w-6 h-6" src="/tick.png" alt="" />
            <span>Bring to the table win-win survival</span>
          </div>
          <div className="flex space-x-4">
            <img className="w-6 h-6" src="/tick.png" alt="" />
            <span>Capitalize on low hanging fruit to identify</span>
          </div>
          <div className="flex space-x-4">
            <img className="w-6 h-6" src="/tick.png" alt="" />
            <span>But I must explain to you how all this</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poster;
