import axios from "axios";
import { useContext, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import JobContext from "../context/JobContext";
import { convertToCustomDateFormat } from "../util/util";
import LoaderSpinner from "./LoaderSpinner";
import Button from "./Button";
import { BsDownload } from "react-icons/bs";
import Spinner from "./Spinner";
import { ToastContainer } from "react-toastify";

function ApplicantInfo({ jobId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [applicants, setApplicants] = useState([]);

  const { baseURL, successToast, errorToast } = useContext(JobContext);
  const [selectedApplicant, setSelectedApplicant] = useState({});

  const modalRef = useRef(null);

  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${baseURL}/applications/${jobId}`, {
          withCredentials: true,
        });
        console.log(res.data);
        setApplicants(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseURL, jobId, refetch]);

  const handleDownload = async (id) => {
    try {
      setIsDownloading(true);
      setClickedId(id);
      const response = await axios.get(`${baseURL}/downlaod/${id}`, {
        responseType: "blob", // This is important for downloading binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `item_${id}.pdf`); // You can adjust the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw new Error("Error downloading item");
    } finally {
      setIsDownloading(false);
      setClickedId(null);
    }
  };

  const handleFeedback = (id) => {
    const selected = applicants.find((applicant) => {
      return applicant._id === id;
    });
    setSelectedApplicant(selected);
    document.getElementById("my_modal_4").showModal();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    modalRef.current.close();
    try {
      setIsSubmit(true);
      await axios.patch(`${baseURL}/applications/${selectedApplicant._id}`, {
        status: e.target.status.value,
        feedback: e.target.feedback.value,
      });
      successToast("Feedback posted successful", 2000);
      setRefetch(refetch + 1);
    } catch (error) {
      console.log(error);
      errorToast("Cant post feedback", 2000);
    } finally {
      setIsSubmit(false);
      e.target.status.value = "reject";
      e.target.feedback.value = "";
    }
  }

  return (
    <>
      {isSubmit && <Spinner />}
      <div className="my-28 container mx-auto">
        <div
          className="flex border border-[#6edcbe] bg-rose-300 justify-center items-center mb-10 px-8 py-3 space-x-2 w-fit mx-auto
          rounded-xl"
        >
          <div className="w-8 h-8">
            <img
              className="w-full h-full"
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-applicants-job-search-flaticons-lineal-color-flat-icons-4.png"
              alt="external-applicants-job-search-flaticons-lineal-color-flat-icons-4"
            />
          </div>
          <h1 className="text-2xl font-bold text-zinc-700">Applicant List</h1>
        </div>
        <div className="">
          {isLoading ? (
            <LoaderSpinner />
          ) : (
            <div className="container mx-auto overflow-x-auto text-sm md:text-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-zinc-700 text-white">
                    <th className="py-6 px-4 text-lg md:text-xl text-center rounded-tl-xl">
                      Applicant Email
                    </th>
                    <th className="py-6 px-4 text-lg md:text-xl text-center">
                      Applied Date
                    </th>
                    <th className="py-6 px-4 text-lg md:text-xl text-center">
                      PDF
                    </th>
                    <th className="py-6 px-4 text-lg md:text-xl text-center rounded-tr-xl">
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant) => (
                    <tr key={applicant._id} className="border">
                      <td className="py-4 px-4 text-center min-w-[140px]">
                        {applicant.applicantEmail}
                      </td>
                      <td className="py-4 px-4 text-center min-w-[140px]">
                        {convertToCustomDateFormat(applicant.createdAt)}
                      </td>
                      <td className="py-4 px-4 text-center min-w-[140px]">
                        {/* download */}
                        <Button
                          disabled={
                            isDownloading && clickedId === applicant._id
                          }
                          onClick={() => handleDownload(applicant._id)}
                          primary
                          className="px-4 py-2 flex space-x-2 items-center mx-auto"
                        >
                          {isDownloading && clickedId === applicant._id ? (
                            <span className="loading loading-dots loading-md"></span>
                          ) : (
                            <BsDownload className="text-sm md:text-lg" />
                          )}

                          <span className="text-sm md:text-lg">
                            {isDownloading ? "Downlaoding" : "Download"}
                          </span>
                        </Button>
                      </td>
                      <td className="py-4 px-4 text-center min-w-[250px]">
                        {/* feedback */}
                        <Button
                          onClick={() => handleFeedback(applicant._id)}
                          secondary={applicant.status === "pending"}
                          className={`px-4 py-2 flex space-x-2 items-center mx-auto 
                          ${
                            applicant.status === "reject"
                              ? "rounded-lg border-none bg-rose-300 font-semibold  tracking-wide transition-all duration-150 hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-400 focus:ring-offset-2 active:bg-rose-400 disabled:cursor-not-allowed disabled:bg-rose-200 text-zinc-800"
                              : applicant.status === "accept" &&
                                "rounded-lg border-none bg-[#6edcbe] font-semibold  tracking-wide transition-all duration-150 hover:bg-[#58b59c] focus:outline-none focus:ring focus:ring-[#58b59c] focus:ring-offset-2 active:bg-[#6edcbe] disabled:cursor-not-allowed disabled:bg-[#8bf9dc] text-zinc-800"
                          }`}
                        >
                          <div className="w-8 h-8">
                            {applicant.status === "pending" && (
                              <img
                                className="w-full h-full"
                                src="https://img.icons8.com/color/48/satisfied.png"
                                alt="satisfied"
                              />
                            )}
                            {applicant.status === "reject" && (
                              <img
                                className="w-full h-full"
                                src="https://img.icons8.com/glyph-neue/64/delete-user-male.png"
                                alt="delete-user-male"
                              />
                            )}
                            {applicant.status === "accept" && (
                              <img
                                className="w-full h-full"
                                src="https://img.icons8.com/ios-filled/50/ok-hand--v1.png"
                                alt="ok-hand--v1"
                              />
                            )}
                          </div>
                          <span className="text-sm md:text-lg">
                            {applicant.status === "pending"
                              ? "Response"
                              : applicant.status === "accept"
                              ? "Accepted"
                              : "Rejected"}
                          </span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* modal */}
        <div className="">
          <dialog
            ref={modalRef}
            id="my_modal_4"
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
                Give Feedback to applicant
              </h3>
              {/* form */}
              <div className="w-full max-w-md mx-auto ">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
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
                      disabled
                      defaultValue={selectedApplicant.applicantEmail}
                    />
                  </div>
                  <div className="mb-6">
                    <select
                      name="status"
                      className="select select-md select-bordered w-full "
                    >
                      <option value="reject">Reject</option>
                      <option value="accept">Accept</option>
                    </select>
                  </div>
                  <div className="mb-6 ">
                    <textarea
                      name="feedback"
                      className="textarea textarea-bordered w-full"
                      placeholder="feedback"
                      required
                    ></textarea>
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
      </div>
    </>
  );
}

export default ApplicantInfo;
