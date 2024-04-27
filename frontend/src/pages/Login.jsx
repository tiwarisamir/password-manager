import React, { useContext, useRef, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { Context } from "../store/store";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [show, setshow] = useState(false);
  const passwordRef = useRef();
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const { isAuth, login } = useContext(Context);

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
    if (form.email.length != 0 && form.password.length != 0) {
      login(form.email, form.password);
    } else {
      toast.error("Enter email and password first!!");
    }
  };

  if (isAuth) return <Navigate to={"/"} />;

  return (
    <div className="mt-10 w-1/2 m-auto">
      <form>
        <div className="flex flex-col items-center gap-8 mx-auto ">
          <input
            value={form.email}
            onChange={handleChange}
            type="text"
            className="myInput "
            placeholder="Enter email"
            name="email"
            required
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
              required
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
            Login
          </button>

          <h4>Or</h4>

          <Link
            to={"/register"}
            className="font-bold text-lg text-cyan-700 p-2 underline mb-1 mt-1"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
