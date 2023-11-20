import { CiDollar } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { convertToCustomDateFormat, formatRemainingTime } from "../util/util";
import Button from "./Button";
import { useContext, useRef, useState } from "react";
import JobContext from "../context/JobContext";
import axios from "axios";
import Spinner from "./Spinner";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function JobCardPoster({ data }) {
  const { user, baseURL, successToast, errorToast } = useContext(JobContext);
  const [resume, setResume] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const modalRef = useRef(null);

  const handleApplyButton = (id) => {
    console.log(id);
    document.getElementById("my_modal_3").showModal();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile &&
      selectedFile.type === "application/pdf" &&
      selectedFile.size <= 300 * 1024
    ) {
      // File is a PDF and under 300 KB, you can handle it
      setResume(selectedFile);
      setSizeError(false);
    } else {
      // File is not a PDF or exceeds 300 KB, you can handle this case (e.g., show an error)
      setResume(null);
      setSizeError(true);
      console.error("Invalid file format or size");
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // const applicationData = {
    //   applicantName: user.displayName,
    //   applicantEmail: user.email,
    //   resumeLink: resume,
    //   jobId: data._id,
    //   createdAt: new Date(),
    // };
    // console.log(applicationData);

    if (sizeError) {
      return;
    }
    modalRef.current.close();
    const formData = new FormData();
    formData.append("applicantName", user.displayName);
    formData.append("applicantEmail", user.email);
    formData.append("jobId", data._id);
    formData.append("createdAt", new Date());
    formData.append("resume", resume);

    try {
      setIsloading(true);
      const res = await axios.post(
        `${baseURL}/applications?id=${user.uid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      if (res.data.message) {
        return errorToast(res.data.message, 2000);
      }
      successToast("Job Applied Successfull", 2000);
      setTimeout(() => {
        navigate("/applied-jobs");
      }, 3000);
    } catch (error) {
      console.log(error);
      errorToast("Your job application could not be posted !!", 2000);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
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
          <Button
            onClick={() => handleApplyButton(data._id)}
            primary
            className="px-6 py-3 flex space-x-2 items-center"
          >
            <FiUpload className="" />
            <span> Apply For Job</span>
          </Button>
        </div>
      </div>
      {/* Apply Button Modal */}
      <div className="">
        <dialog
          ref={modalRef}
          id="my_modal_3"
          className="modal z-50 fixed inset-0 flex items-center justify-center bg-slate-300/30 backdrop-blur-sm"
        >
          <div className="modal-box">
            {/* modal close form */}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-xl text-zinc-700 mb-2">
              Apply For A Job
            </h3>
            {/* form */}
            <div className="w-full max-w-md mx-auto ">
              <form
                onSubmit={handleSubmitForm}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    className="cursor-not-allowed shadow appearance-none border rounded w-full py-2 px-3
                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                     disabled:bg-gray-200"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    defaultValue={user.displayName}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="cursor-not-allowed shadow appearance-none border rounded w-full py-2 px-3
                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                     disabled:bg-gray-200"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    defaultValue={user.email}
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="resume"
                  >
                    Resume Link:
                  </label>
                  <input
                    className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <div
                    className={`font-semibold text-sm mt-1 ${
                      sizeError ? "text-rose-500 " : "text-green-500 "
                    }`}
                  >
                    * PDF size should not exceed 300 KB
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button primary className="px-4 py-2">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          display: "inline-block",
          width: "auto",
        }}
      />
    </>
  );
}

export default JobCardPoster;
