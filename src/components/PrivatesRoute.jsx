import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import BrandContext from "../context/BrandContext";

function PrivateRoutes({ children }) {
  const { user, loading } = useContext(BrandContext);
  const location = useLocation();

  // console.log("location in protected route", location);

  if (loading) {
    return (
      <div className="absolute inset-0 bg-slate-300/30 text-center flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>;
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" />;
}

export default PrivateRoutes;
