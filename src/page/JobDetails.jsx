import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import JobCardPoster from "../components/JobCardPoster";

function JobDetails() {
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
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const res = await fetch(`http://localhost:5000/jobs/${params.id}`);
  const data = await res.json();
  return data;
}

export default JobDetails;
