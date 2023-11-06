import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();
  return (
    <div className="grow">
      <Helmet>
        <title>JobZen | Details</title>
      </Helmet>
      {id}
    </div>
  );
}

export default JobDetails;
