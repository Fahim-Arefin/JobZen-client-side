import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import JobContext from "../context/JobContext";
import axios from "axios";
import { convertToCustomDateFormat, formatRemainingTime } from "../util/util";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function MyJobs() {
  const { user, baseURL } = useContext(JobContext);
  const [myData, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/job/${id}`);
  };

  const handleUpdateClick = (id) => {
    console.log(id);
  };

  const handleDeleteClick = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this product?",
      icon: "warning",
    });

    if (willDelete) {
      try {
        await axios.delete(`${baseURL}/jobs/${id}`);
        swal(
          "Deleted!",
          "Your product has been deleted form your cart!",
          "success"
        );
        const filteredData = myData.filter((job) => job._id !== id);
        setMyData(filteredData);
      } catch (err) {
        swal("Oops!", "Seems like we couldn't fetch the info", "error");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await axios.get(`${baseURL}/jobs?id=${user.uid}`);
        setMyData(res.data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseURL, user.uid]);

  return (
    <div className="grow">
      <Helmet>
        <title>JobZen | My Jobs</title>
      </Helmet>
      {isError && <Error />}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto my-24">
          <h1 className="text-3xl font-semibold my-4">My Jobs</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Posting Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary Range
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {myData.map((job) => (
                  <tr key={job._id} className="border-t border-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {convertToCustomDateFormat(job.jobPostingDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatRemainingTime(job.applicationDeadline)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.salaryRange}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => handleDetailsClick(job._id)}
                        secondary
                        className="px-3 py-2 uppercase text-sm"
                      >
                        Details
                      </Button>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => handleUpdateClick(job._id)}
                        primary
                        className="px-3 py-2 uppercase text-sm"
                      >
                        Update
                      </Button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteClick(job._id)}
                        className="rounded-lg border-none bg-rose-500 font-semibold  tracking-wide
                              transition-all duration-150 hover:bg-rose-600 focus:outline-none focus:ring focus:ring-rose-600 
                              focus:ring-offset-2 active:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-200 text-zinc-800
                              px-3 py-2 uppercase text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyJobs;
