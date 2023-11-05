import { Helmet } from "react-helmet";
import Banner from "../components/Banner";
import JobTabs from "../components/JobTabs";
import { useState } from "react";

function Home() {
  const [activeTab, setActiveTab] = useState("all-jobs");

  const tabData = [
    { id: "all-jobs", label: "All Jobs" },
    { id: "on-site", label: "On Site Job" },
    { id: "remote", label: "Remote Job" },
    { id: "hybrid", label: "Hybrid" },
    { id: "part-time", label: "Part Time" },
  ];
  return (
    <div className=" grow">
      <Helmet>
        <title>JobZen | Home</title>
      </Helmet>
      <Banner />
      <JobTabs
        tabData={tabData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="mb-24"
      />
    </div>
  );
}

export default Home;
