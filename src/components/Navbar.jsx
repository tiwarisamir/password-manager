import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#272932] flex justify-between items-center p-2 px-10 ">
      <div className="text-2xl font-bold text-white">
        <span className="text-green-400">Pass</span>Man*
      </div>
      <ul className="flex gap-5 text-white text-xl font-semibold">
        <li>
          <a className="cursor-pointer hover:text-slate-200 hover:border-b-2">
            Home
          </a>
        </li>
        <li>
          <a className="cursor-pointer hover:text-slate-200 hover:border-b-2">
            About
          </a>
        </li>
        <li>
          <a className="cursor-pointer hover:text-slate-200 hover:border-b-2">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
