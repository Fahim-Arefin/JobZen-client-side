import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import AppLayout from "./layout/AppLayout";
import Login from "./page/Login";
import Registration from "./page/Registration";
import { JobProvider } from "./context/JobContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
  <React.StrictMode>
    <JobProvider>
      <RouterProvider router={router} />
    </JobProvider>
  </React.StrictMode>
);
