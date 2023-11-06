import { Helmet } from "react-helmet";
import Banner from "../components/Banner";
import JobTabs from "../components/JobTabs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import JobContext from "../context/JobContext";
import JobList from "./JobList";

function Home() {
  const [activeTab, setActiveTab] = useState("all-jobs");

  const [data, setData] = useState([]);
  const { baseURL } = useContext(JobContext);

  useEffect(() => {
    const fetData = async () => {
      const res = await axios.get(`${baseURL}/jobs`);
      const data = res.data;
      // console.log(data);
      setData(data);
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
  return (
    <div className="grow">
      <Helmet>
        <title>JobZen | Home</title>
      </Helmet>
      <Banner />
      <JobTabs
        tabData={tabData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="mb-12"
      />
      <JobList data={data} />
    </div>
  );
}

export default Home;
