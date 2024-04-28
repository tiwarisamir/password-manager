import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

export const server = "https://password-manager-vjj9.onrender.com/api/";
// export const server = "http://localhost:3000/api/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
