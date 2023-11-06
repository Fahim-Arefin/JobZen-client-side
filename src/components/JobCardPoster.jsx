import { CiDollar } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { convertToCustomDateFormat, formatRemainingTime } from "../util/util";
import Button from "./Button";

function JobCardPoster({ data }) {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center h-full">
      <div
        className="col-span-1
    flex flex-col md:flex-row justify-center md:items-center space-x-6 p-8"
      >
        <div className="w-20 h-20 md:w-32 md:h-32 rounded-lg ml-6 mb-4 md:ml-0 md:mb-0">
          <img
            className="w-fill h-full rounded-lg"
            src={data.bannerUrl}
            alt=""
          />
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold text-[#202124]">
            {data.jobTitle}
          </h1>
          <div
            className="flex flex-wrap md:flex-nowrap gap-2 md:space-x-6 xl:space-x-3 2xl:space-x-6
         text-[#767676] mt-2 mb-6 md:mb-0"
          >
            <div className="flex items-center space-x-1">
              <FiUpload className="" />
              <span className="text-sm mt-0.5">
                {convertToCustomDateFormat(data.jobPostingDate)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <RxCounterClockwiseClock className="text-lg" />
              <span className="text-sm mt-0.5">
                {formatRemainingTime(data.applicationDeadline)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <CiDollar className="text-xl" />
              <span className="text-sm mt-0.5">{data.salaryRange}</span>
            </div>
          </div>

          <div className="flex space-x-3 text-sm mt-4">
            <div className=" rounded-full bg-[#34a85326] w-fit px-5 py-1 text-[#34a853]">
              <span>{data.userName}</span>
            </div>
            <div className=" rounded-full bg-[#dde8f8] w-fit px-5 py-1 text-[#4f8bdd] first-letter:uppercase">
              <span>{data.jobCategory}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-x-2 space-y-2 flex flex-col items-center lg:items-start">
        <div className=" text-[#767676] text-sm flex items-center">
          <div className="w-10 h-10">
            <img className="w-full h-full" src="/applicant.png" alt="" />
          </div>
          <span>
            Already Applied:
            <span className="mx-1 font-bold text-red-500">
              {data.jobApplicants}
            </span>
          </span>
        </div>
        <Button primary className="px-6 py-3 flex space-x-2 items-center">
          <FiUpload className="" />
          <span> Apply For Job</span>
        </Button>
      </div>
    </div>
  );
}

export default JobCardPoster;
