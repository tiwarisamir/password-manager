import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Manager from "./pages/Manager.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export const server = "http://localhost:3000/api/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      { path: "/", element: <Manager /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
