import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ContextProvider, { Context } from "./store/store";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { server } from "./main";

function App() {
  const { isAuth, user, setisAuth, setuser } = useContext(Context);
  // console.log("point 0");

  return (
    <>
      <div className="bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Navbar />
        <Toaster />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}

export default AppWrapper;
