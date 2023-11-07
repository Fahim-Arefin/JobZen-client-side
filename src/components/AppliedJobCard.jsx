import { CiDollar } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { convertToCustomDateFormat, formatRemainingTime } from "../util/util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function AppliedJobCard({ data }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(id);
    navigate(`/job/${id}`);
  };

  return (
    <div
      className="col-span-1 border border-gray-200 rounded-xl 
    flex justify-center xl:justify-start space-x-6 p-8"
    >
      <div className="w-16 h-12 md:w-16 md:h-16 rounded-lg">
        <img className="w-fill h-full rounded-lg" src={data.bannerUrl} alt="" />
      </div>
      <div className="">
        <h1 className="text-2xl font-semibold text-[#202124]">
          {data.jobTitle}
        </h1>
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
        <div
          className="flex flex-wrap md:flex-nowrap gap-2 md:space-x-6 xl:space-x-3 2xl:space-x-6
         text-[#767676] mt-4 mb-6 md:mb-0"
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

        <div className="flex space-x-3 text-sm mt-2">
          <div className=" rounded-full bg-[#34a85326] w-fit px-5 py-1 text-[#34a853]">
            <span>{data.userName}</span>
          </div>
          <div className=" rounded-full bg-[#dde8f8] w-fit px-5 py-1 text-[#4f8bdd] first-letter:uppercase">
            <span>{data.jobCategory}</span>
          </div>
        </div>
        <Button
          primary
          outline
          className="px-3 py-2 mt-6 w-full text-[#202124] tracking-wider flex items-center justify-center space-x-2 uppercase"
          onClick={() => handleClick(data._id)}
        >
          <TbListDetails className="text-xl" />
          <span className="mt-0.5">Job Details</span>
        </Button>
      </div>
    </div>
  );
}

export default AppliedJobCard;
