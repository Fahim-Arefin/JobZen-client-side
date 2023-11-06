import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import JobContext from "../context/JobContext";
import Spinner from "../components/Spinner";
import { ToastContainer } from "react-toastify";

function AddJobs() {
  const [isLoading, setIslaoding] = useState(false);
  // const [isError, setIsError] = useState(false);
  const { user, successToast, errorToast, baseURL } = useContext(JobContext);

  const [jobData, setJobData] = useState({
    bannerUrl: "",
    jobTitle: "",
    userName: user?.displayName,
    jobCategory: "on-site",
    salaryRange: "",
    jobDescription: "",
    jobPostingDate: new Date(),
    applicationDeadline: new Date(),
    jobApplicants: 0,
  });
  useEffect(() => {
    setJobData({
      ...jobData,
      ["userName"]: user?.displayName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.displayName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setJobData({
      ...jobData,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIslaoding(true);
      // setIsError(false);
      const res = await axios.post(`${baseURL}/jobs`, {
        ...jobData,
        authorId: user.uid,
      });
      console.log(res.data);
      setJobData({
        bannerUrl: "",
        jobTitle: "",
        userName: "",
        jobCategory: "on-site",
        salaryRange: "",
        jobDescription: "",
        jobPostingDate: new Date(),
        applicationDeadline: new Date(),
        jobApplicants: 0,
      });
      successToast("Job Posted SuccessFully !!", 2000);
    } catch (error) {
      console.log(error);
      setIslaoding(false);
      // setIsError(true);
      errorToast("Job Post Failed !!", 2000);
    } finally {
      setIslaoding(false);
      setJobData({
        ...jobData,
        bannerUrl: "",
        jobTitle: "",
        userName: user?.displayName,
        jobCategory: "on-site",
        salaryRange: "",
        jobDescription: "",
        jobPostingDate: new Date(),
        applicationDeadline: new Date(),
        jobApplicants: 0,
      });
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="container mx-auto py-4 px-8 my-24">
        <Helmet>
          <title>JobZen | Add A Job</title>
        </Helmet>
        <h2 className="text-3xl font-semibold mb-4 text-zinc-700">Add A Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* url */}
            <div className="space-y-2">
              <label htmlFor="bannerUrl" className="text-zinc-700">
                Picture URL
              </label>
              <input
                required
                type="text"
                id="bannerUrl"
                name="bannerUrl"
                value={jobData.bannerUrl}
                onChange={handleInputChange}
                className="input w-full rounded-md px-3 py-2 mt-1"
              />
            </div>
            {/* title */}
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-zinc-700">
                Job Title
              </label>
              <input
                required
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleInputChange}
                className="input w-full rounded-md px-3 py-2 mt-1"
              />
            </div>
            {/* user name */}
            <div className="space-y-2">
              <label htmlFor="userName" className="text-zinc-700">
                Logged In User Name
              </label>
              <input
                disabled
                type="text"
                id="userName"
                name="userName"
                value={jobData.userName}
                onChange={handleInputChange}
                className="input w-full rounded-md px-3 py-2 mt-1"
              />
            </div>
            {/* category */}
            <div className="space-y-2">
              <label htmlFor="jobCategory" className="text-zinc-700">
                Job Category
              </label>
              <select
                id="jobCategory"
                name="jobCategory"
                value={jobData.jobCategory}
                onChange={handleInputChange}
                className="input w-full rounded-md px-3 py-2 mt-1"
              >
                <option value="on-site">On Site</option>
                <option value="remote">Remote</option>
                <option value="part-time">Part-Time</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* salary range */}
            <div className="space-y-2">
              <label htmlFor="salaryRange" className="text-zinc-700">
                Salary Range
              </label>
              <input
                required
                type="text"
                id="salaryRange"
                name="salaryRange"
                value={jobData.salaryRange}
                onChange={handleInputChange}
                className="input w-full rounded-md px-3 py-2 mt-1"
                placeholder="$80,000 - $100,000"
              />
            </div>
            {/* description */}
            <div className="space-y-2">
              <label htmlFor="jobDescription" className="text-zinc-700">
                Job Description
              </label>
              <textarea
                required
                id="jobDescription"
                name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleInputChange}
                rows="4"
                className="border border-gray-300 w-full rounded-md px-3 py-2 mt-1 outline-none
              focus:outline-none  focus:ring focus:ring-gray-300 focus:ring-offset-2"
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* job posting date */}
            <div className="space-y-2 md:space-x-4">
              <label htmlFor="jobPostingDate" className="text-zinc-700">
                Job Posting Date
              </label>
              <DatePicker
                selected={jobData.jobPostingDate}
                onChange={(date) => handleDateChange(date, "jobPostingDate")}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                maxDate={new Date()}
                className="input w-full rounded-md px-3 py-2 mt-1 cursor-pointer"
              />
            </div>
            {/* deadline */}
            <div className="space-y-2 md:space-x-4">
              <label htmlFor="applicationDeadline" className="text-zinc-700">
                Application Deadline
              </label>
              <DatePicker
                selected={jobData.applicationDeadline}
                onChange={(date) =>
                  handleDateChange(date, "applicationDeadline")
                }
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="input w-full rounded-md px-3 py-2 mt-1 cursor-pointer"
              />
            </div>
          </div>
          <div>
            <label className="text-zinc-700">Job Applicants Number</label>
            <input
              disabled
              type="number"
              name="jobApplicants"
              value={jobData.jobApplicants}
              onChange={handleInputChange}
              className="input w-full rounded-md px-3 py-2 mt-1"
            />
          </div>
          <Button
            primary
            type="submit"
            className="px-4 py-2 mt-6 flex space-x-1"
            disabled={isLoading ? true : false}
          >
            <AiOutlinePlus className="mt-0.5" />
            {isLoading ? <span>Adding Job...</span> : <span>Add Job</span>}
          </Button>
        </form>
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

export default AddJobs;
