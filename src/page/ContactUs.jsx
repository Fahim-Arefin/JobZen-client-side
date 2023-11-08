import { useContext, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Spinner from "../components/Spinner";
import JobContext from "../context/JobContext";
import { ToastContainer } from "react-toastify";

const ContactUs = () => {
  const form = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const { user, successToast, errorToast } = useContext(JobContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm(
        "service_oa4c3t4",
        "template_1he9spy",
        form.current,
        "ZfhUw5lUzr_cm7A6n"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          setIsLoading(false);
          successToast(
            "We Recieved your Message !! We will contact soon..",
            2000
          );
        },
        (error) => {
          console.log(error.text);
          setIsLoading(false);
          errorToast("We Could not recieved your Message !! ", 2000);
        }
      );
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="w-full max-w-md mx-auto">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="from_name"
            >
              Name
            </label>
            <input
              className="cursor-not-allowed disabled:text-gray-400 input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="from_name"
              id="from_name"
              defaultValue={userData?.displayName}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="from_email"
            >
              Email
            </label>
            <input
              className="cursor-not-allowed disabled:text-gray-400 input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="from_email"
              id="from_email"
              required
              placeholder="Name"
              defaultValue={userData?.email}
              disabled
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="input h-[100px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="message"
              id="message"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#b2ebf9] hover:bg-[#92d8e1] text-zinc-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          display: "inline-block",
          width: "auto",
        }}
      />
    </>
  );
};

export default ContactUs;
