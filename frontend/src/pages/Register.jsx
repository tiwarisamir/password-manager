import React, { useContext, useRef, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Context } from "../store/store";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [show, setshow] = useState(false);
  const passwordRef = useRef();
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { isAuth, register } = useContext(Context);

  const handelShow = () => {
    const newShowState = !show;
    setshow(newShowState);
    if (passwordRef.current) {
      passwordRef.current.type = newShowState ? "text" : "password";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      form.username.length != 0 &&
      form.email.length != 0 &&
      form.password.length != 0
    ) {
      register(form.username, form.email, form.password);
    } else {
      toast.error("Enter email, username and password first!!");
    }
  };

  if (isAuth) return <Navigate to={"/"} />;
  return (
    <div className="mt-10 w-1/2 m-auto">
      <form>
        <div className="flex flex-col items-center gap-8 mx-auto ">
          <input
            value={form.username}
            onChange={handleChange}
            type="text"
            className="myInput "
            placeholder="Enter username"
            name="username"
          />
          <input
            value={form.email}
            onChange={handleChange}
            type="text"
            className="myInput "
            placeholder="Enter email"
            name="email"
          />
          <div className="relative w-full">
            <input
              value={form.password}
              onChange={handleChange}
              ref={passwordRef}
              type="password"
              className="myInput"
              placeholder="Enter password"
              name="password"
            />
            <span
              className="absolute right-3 top-3 text-xl cursor-pointer bg-slate-200 p-2 rounded-full  "
              onClick={handelShow}
            >
              {show ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

          <button
            className="bg-cyan-700 px-10 py-3 border-0 rounded-lg font-bold text-xl text-white hover:bg-cyan-600 "
            onClick={handleSave}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
