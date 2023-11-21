import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import JobContext from "../context/JobContext";
import { convertToCustomDateFormat } from "../util/util";
import LoaderSpinner from "./LoaderSpinner";
import Button from "./Button";
import { BsDownload } from "react-icons/bs";

function ApplicantInfo({ jobId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const { baseURL } = useContext(JobContext);

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
  }, [baseURL, jobId]);

  const handleDownload = async (id) => {
    try {
      setIsDownloading(true);
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
    }
  };

  return (
    <>
      {applicants.length > 0 && (
        <div className="my-28 container mx-auto">
          <div
            className="flex border border-rose-400 bg-rose-300 justify-center items-center mb-10 px-8 py-3 space-x-2 w-fit mx-auto
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
                            disabled={isDownloading}
                            onClick={() => handleDownload(applicant._id)}
                            primary
                            className="px-4 py-2 flex space-x-2 items-center mx-auto"
                          >
                            {isDownloading ? (
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
                            secondary
                            className="px-4 py-2 flex space-x-2 items-center mx-auto"
                          >
                            <div className="w-8 h-8">
                              <img
                                className="w-full h-full"
                                src="https://img.icons8.com/color/48/satisfied.png"
                                alt="satisfied"
                              />
                            </div>
                            <span className="text-sm md:text-lg">
                              Give Feedback
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
        </div>
      )}
    </>
  );
}

export default ApplicantInfo;
