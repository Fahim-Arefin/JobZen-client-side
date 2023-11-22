import Button from "./Button";
import { useNavigate } from "react-router-dom";

import { TbListDetails } from "react-icons/tb";
import { useRef } from "react";

function AppliedJobList({ data }) {
  const navigate = useNavigate();

  // console.log(data);
  const modalRef = useRef();

  const handleClick = (id) => {
    console.log(id);
    navigate(`/job/${id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-6 w-full md:w-96 mx-auto">
      <img
        className="w-full h-32 object-cover mb-4 rounded-md"
        src={data.bannerUrl}
        alt=""
      />
      <h1 className="text-xl font-semibold text-[#202124] mb-2">
        {data.jobTitle}
      </h1>
      <div className="flex space-x-3 text-sm mb-4">
        <div
          className={`rounded-full px-4 py-1.5 
          ${data.status === "pending" && "text-[#4f8bdd] bg-[#dde8f8]"}
          ${data.status === "accept" && "text-[#34a853] bg-[#34a85326]"}
          ${data.status === "reject" && "text-rose-500 bg-rose-200"}
          `}
        >
          {data.status === "pending" && (
            <div className="flex space-x-1 items-center">
              <div className="">
                <img
                  className="w-full h-full"
                  src="https://img.icons8.com/office/16/hourglass-sand-top.png"
                  alt="hourglass-sand-top"
                />
              </div>
              <span>Pending</span>
            </div>
          )}
          {data.status === "accept" && (
            <div className="flex space-x-1 items-center">
              <div className="w-5 h-5">
                <img
                  src="https://img.icons8.com/color/48/approval--v1.png"
                  alt="approval--v1"
                />
              </div>
              <span>Accepted</span>
            </div>
          )}
          {data.status === "reject" && (
            <div className="flex space-x-1 items-center">
              <div className="w-5 h-5">
                <img
                  src="https://img.icons8.com/offices/30/delete-sign.png"
                  alt="delete-sign"
                />
              </div>
              <span>Rejected</span>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <Button
          primary
          outline
          className="w-full text-[#202124] tracking-wider flex items-center justify-center space-x-2 uppercase px-4 py-2"
          onClick={() => handleClick(data._id)}
        >
          <TbListDetails className="text-xl" />
          <span className="mt-0.5">Job Details</span>
        </Button>
        <Button
          onClick={() => modalRef.current.showModal()}
          secondary
          outline
          className="w-full text-[#202124] tracking-wider flex items-center justify-center space-x-2 uppercase px-4 py-2"
        >
          <div className="w-7 h-7">
            <img
              className="w-full h-full"
              src="https://img.icons8.com/color/48/satisfied.png"
              alt="satisfied"
            />
          </div>
          <span className="mt-0.5">Feedback</span>
        </Button>
      </div>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {data.status === "pending" && (
            <h3 className="font-bold text-xl">Please wait for response!</h3>
          )}
          {data.status === "accept" && (
            <h3 className="font-bold text-xl">
              Congratulations you are priliminary selected !
            </h3>
          )}
          {data.status === "reject" && (
            <h3 className="font-bold text-xl">
              Unfortunately your resume did not make it!
            </h3>
          )}

          <p className="py-4 text-sm">{data.feedback}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AppliedJobList;
