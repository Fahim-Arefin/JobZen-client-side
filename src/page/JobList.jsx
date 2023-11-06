import JobCard from "../components/JobCard";

function JobList({ data }) {
  return (
    <div className="p-0 md:px-6 2xl:px-44 grid grid-cols-1 xl:grid-cols-2 gap-10 mb-24">
      {data?.map((job) => (
        <JobCard key={job._id} data={job} />
      ))}
    </div>
  );
}

export default JobList;
