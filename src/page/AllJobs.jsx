import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { convertToCustomDateFormat, formatRemainingTime } from "../util/util";
import { FiSearch } from "react-icons/fi";

function AllJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const jobData = useLoaderData();
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(id);
    navigate(`/job/${id}`);
  };

  const filteredJobs = jobData.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="grow mb-24">
        <Helmet>
          <title>JobZen | All Jobs</title>
        </Helmet>
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold my-4">All Jobs</h1>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search by Job Title"
              className="input px-6 py-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute top-3 text-xl right-6" />
          </div>
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
                {filteredJobs.map((job) => (
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
                        onClick={() => handleClick(job._id)}
                        secondary
                        className="px-4 py-2 uppercase"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const res = await fetch("http://localhost:5000/jobs", {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default AllJobs;
