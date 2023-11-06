const JobTabs = ({ tabData, activeTab, className, handleTabClick }) => {
  return (
    <div className={`w-full mx-auto max-w-screen-lg ${className}`}>
      <div className="flex flex-wrap">
        {tabData.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`w-full md:flex-1 p-4 text-center cursor-pointer ${
              activeTab === tab.id ? "border-b-2 border-[#9685e2]" : "border-b"
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTabs;
