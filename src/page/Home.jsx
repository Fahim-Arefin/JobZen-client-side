import { Helmet } from "react-helmet";
import Banner from "../components/Banner";
import JobTabs from "../components/JobTabs";
import { useContext, useState } from "react";
import axios from "axios";
import JobContext from "../context/JobContext";
import JobList from "./JobList";
import LoaderSpinner from "../components/LoaderSpinner";
import { useEffect } from "react";

function Home() {
  const [activeTab, setActiveTab] = useState("all-jobs");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const { baseURL } = useContext(JobContext);
  const [isLoading, setIslaoding] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetData = async () => {
      try {
        setIslaoding(true);
        setIsError(false);
        const res = await axios.get(`${baseURL}/jobs`);
        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIslaoding(false);
      }
    };
    fetData();
  }, [baseURL]);

  const tabData = [
    { id: "all-jobs", label: "All Jobs" },
    { id: "on-site", label: "On Site Job" },
    { id: "remote", label: "Remote Job" },
    { id: "hybrid", label: "Hybrid" },
    { id: "part-time", label: "Part Time" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== "all-jobs") {
      const filtereData = data.filter((job) => {
        if (job.jobCategory.includes(tabId)) {
          return true;
        }
      });
      setFilteredData(filtereData);
    } else {
      setFilteredData([...data]);
    }
  };

  console.log(filteredData);

  return (
    <div className="grow">
      <Helmet>
        <title>JobZen | Home</title>
      </Helmet>
      <Banner />
      <JobTabs
        tabData={tabData}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        className="mb-12"
      />
      {isLoading ? <LoaderSpinner /> : <JobList data={filteredData} />}
      {isError && "Error"}
    </div>
  );
}

export default Home;
