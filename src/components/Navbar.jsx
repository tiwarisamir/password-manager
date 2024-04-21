import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#272932] flex flex-col gap-2 justify-between items-center p-2 px-10 md:flex-row  ">
      <div className="text-2xl font-bold text-white">
        <span className="text-cyan-600">Pass</span>Man*
      </div>
      <div className="flex gap-2">
        <button className="bg-cyan-700 py-1 px-3 rounded-full font-semibold  text-white hover:bg-cyan-600">
          Sign in
        </button>
        <button className="bg-cyan-700 py-1 px-3 rounded-full font-semibold  text-white hover:bg-cyan-600">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
