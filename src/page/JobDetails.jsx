import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import JobCardPoster from "../components/JobCardPoster";
import { useContext } from "react";
import JobContext from "../context/JobContext";
import ApplicantInfo from "../components/ApplicantInfo";

function JobDetails() {
  const { user } = useContext(JobContext);
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="grow">
      <Helmet>
        <title>JobZen | Details</title>
      </Helmet>
      <div className="w-full h-[500px] lg:h-[300px] bg-gradient-to-r from-[#f7f8fd] to-[#e5ecfa]">
        <JobCardPoster data={data} />
      </div>
      <div className="grid grid-cols-1 space-y-6 xl:space-y-0 xl:grid-cols-2 my-24 container mx-auto text-[#202124]">
        <div className="rounded-lg col-span-1 h-[300px] md:h-[500px]">
          <img
            className="w-full h-full rounded-lg"
            src={data.bannerUrl}
            alt=""
          />
        </div>
        <div className="p-4 md:px-12 md:py-4 space-y-2 col-span-1">
          <h1 className="text-3xl font-bold text-center">{data.jobTitle}</h1>
          <h2 className="text-center text-red-500 font-semibold text-sm">
            {data.salaryRange}
          </h2>
          <p className="text-justify text-[#767676] text-sm md:text-lg">
            {data.jobDescription}
          </p>
        </div>
      </div>
      {/* job applicant list, only see who owns that */}
      {data.authorId === user.uid && (
        <ApplicantInfo jobId={data._id} jobName={data.jobTitle} />
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const res = await fetch(
    `https://job-zen-server-side.vercel.app/jobs/${params.id}`
  );
  // const res = await fetch(`http://localhost:5000/jobs/${params.id}`);
  const data = await res.json();
  return data;
}

export default JobDetails;
