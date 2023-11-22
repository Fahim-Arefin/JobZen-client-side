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
  // const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // const [selectedCategory, setSelectedCategory] = useState("all-jobs");

  // const handleChangeOnCategory = (event) => {
  //   setSelectedCategory(event.target.value);
  // };

  // useEffect(() => {
  //   if (selectedCategory !== "all-jobs") {
  //     const filtereData = appliedData.filter((job) => {
  //       if (job.jobCategory.includes(selectedCategory)) {
  //         return true;
  //       }
  //     });
  //     setFilteredData(filtereData);
  //   } else {
  //     setFilteredData([...appliedData]);
  //   }
  // }, [selectedCategory, appliedData]);

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
        // setFilteredData(res.data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseURL, user.email]);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && "Error"}
      <div className=" grow">
        <Helmet>
          <title>JobZen | Applied Jobs</title>
        </Helmet>
        <div className="mt-12">
          {/* <div className="w-full text-center py-12">
            <select
              className="select w-full max-w-xs select-bordered"
              value={selectedCategory}
              onChange={handleChangeOnCategory}
            >
              <option value="all-jobs">See All</option>
              <option value="on-site">On Site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="part-time">Part-Time</option>
            </select>
          </div> */}
          <div className="p-0 md:px-6 2xl:px-44 grid grid-cols-1 xl:grid-cols-3 gap-10 mb-24">
            {appliedData?.map((jobs) => (
              // <AppliedJobCard key={jobs._id} data={jobs} />
              <AppliedJobList key={jobs._id} data={jobs} />
            ))}
          </div>
          <div className="mx-auto my-24">
            <div> {appliedData?.length === 0 && <FoundNoProduct />}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppliedJobs;
