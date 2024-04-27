import React, { useContext } from "react";
import { Context } from "../store/store";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuth, logout, user } = useContext(Context);

  return (
    <nav className="bg-[#272932] flex flex-col gap-2 justify-between items-center p-2 px-10 md:flex-row  ">
      <div className="text-2xl font-bold text-white">
        <span className="text-cyan-600">Pass</span>Man*
      </div>
      <div className="flex gap-6  items-center">
        {isAuth && (
          <h1 className="text-white font-semibold ">
            👋 Hello, {user.username}
          </h1>
        )}
        <div className="bg-cyan-700 py-1 px-3 rounded-lg font-semibold  text-white hover:bg-cyan-600">
          {isAuth ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to={"login"}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
