// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import AppLayout from "./layout/AppLayout";
import Login from "./page/Login";
import Registration from "./page/Registration";
import { JobProvider } from "./context/JobContext";
import AllJobs, { loader as loadAllJobs } from "./page/AllJobs";
import AppliedJobs from "./page/AppliedJobs";
import AddJobs from "./page/AddJobs";
import MyJobs from "./page/MyJobs";
import PageNotFound from "./page/PageNotFound";
import JobDetails from "./page/JobDetails";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import { loader as loadJobById } from "./page/JobDetails";
import { loader as loadOneJob } from "./page/UpdateJob";
import UpdateJob from "./page/UpdateJob";
import ContactUs from "./page/ContactUs";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/jobs",
        element: <AllJobs />,
        errorElement: <Error />,
        loader: loadAllJobs,
      },
      {
        path: "/job/:id",
        element: (
          <PrivateRoute msg={"You have to log in first to view details"}>
            <JobDetails />
          </PrivateRoute>
        ),
        errorElement: <Error />,
        loader: loadJobById,
      },
      {
        path: "/applied-jobs",
        element: (
          <PrivateRoute
            msg={"You have to log in first to see your applied jobs"}
          >
            <AppliedJobs />
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/add-jobs",
        element: (
          <PrivateRoute msg={"You have to log in first to Add jobs"}>
            <AddJobs />
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/update/:id",
        element: <UpdateJob />,
        errorElement: <Error />,
        loader: loadOneJob,
      },
      {
        path: "/my-jobs",
        element: (
          <PrivateRoute msg={"You have to log in first to see my jobs"}>
            <MyJobs />
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <JobProvider>
    <RouterProvider router={router} />
  </JobProvider>
  // </React.StrictMode>
);
