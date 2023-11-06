import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import JobContext from "../context/JobContext";
import Spinner from "./Spinner";
import { ToastContainer } from "react-toastify";

function PrivateRoute({ children, msg }) {
  const { user, loading, errorToast } = useContext(JobContext);
  const location = useLocation();

  // console.log("location in protected route", location);

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return children;
  } else if (!user) {
    errorToast(msg, 2000);
    return (
      <>
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
        <Navigate state={location.pathname} to="/login" />
      </>
    );
  }
}

export default PrivateRoute;
