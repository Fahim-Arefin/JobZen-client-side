import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import JobContext from "../context/JobContext";
import axios from "axios";
import Spinner from "../components/Spinner";
// import AppliedJobCard from "../components/AppliedJobCard";
import FoundNoProduct from "../components/FoundNoProduct";
import AppliedJobList from "../components/AppliedJobList";

function AppliedJobs() {
  const { user, baseURL } = useContext(JobContext);

  const [appliedData, setAppliedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await axios.get(
          `${baseURL}/applications?email=${user.email}`,
          { withCredentials: true }
        );
        setAppliedData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseURL, user.email]);

  useEffect(() => {
    if (selectedCategory !== "all") {
      const filtereData = appliedData.filter((job) => {
        if (job.status === selectedCategory) {
          return true;
        }
      });
      setFilteredData([...filtereData]);
    } else {
      setFilteredData([...appliedData]);
    }
  }, [selectedCategory, appliedData]);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && "Error"}
      <div className=" grow">
        <Helmet>
          <title>JobZen | Applied Jobs</title>
        </Helmet>
        <div className="mt-12">
          <div className="w-full text-center py-12">
            <select
              className="select w-full max-w-xs select-bordered"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">See All</option>
              <option value="pending">Pending</option>
              <option value="accept">Accepted</option>
              <option value="reject">Rejected</option>
            </select>
          </div>
          <div className="p-0 md:px-6 2xl:px-44 grid grid-cols-1 xl:grid-cols-3 gap-10 mb-24">
            {filteredData?.map((jobs) => (
              // <AppliedJobCard key={jobs._id} data={jobs} />
              <AppliedJobList key={uuidv4()} data={jobs} />
            ))}
          </div>
          <div className="mx-auto my-24">
            <div> {filteredData?.length === 0 && <FoundNoProduct />}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppliedJobs;
