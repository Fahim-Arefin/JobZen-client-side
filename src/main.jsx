// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import AppLayout from "./layout/AppLayout";
import Login from "./page/Login";
import Registration from "./page/Registration";
import { JobProvider } from "./context/JobContext";
import AllJobs, { loader as categoriesLoader } from "./page/AllJobs";
import AppliedJobs from "./page/AppliedJobs";
import AddJobs from "./page/AddJobs";
import MyJobs from "./page/MyJobs";
import PageNotFound from "./page/PageNotFound";
import JobDetails from "./page/JobDetails";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <AllJobs />,
        errorElement: <Error />,
        loader: categoriesLoader,
      },
      {
        path: "/jobs-details/:id",
        element: (
          <PrivateRoute msg={"You have to log in first to view details"}>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/applied-jobs",
        element: <AppliedJobs />,
      },
      {
        path: "/add-jobs",
        element: <AddJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
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
