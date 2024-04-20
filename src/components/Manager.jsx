import { useRef, useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Manager = () => {
  const [show, setshow] = useState(false);
  const passwordRef = useRef();

  const handelShow = () => {
    setshow(!show);
    if (show) {
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
    }
  };
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg--400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="max-w-4xl p-5  mx-auto">
        <div className=" text-center py-10">
          <div className="text-3xl font-bold">
            <span className="text-green-500">Pass</span>Man*
          </div>
          <p className="text-green-600  font-semibold ">
            Your Own Password Manager
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 mx-auto ">
          <input
            type="text"
            className="myInput "
            placeholder="Enter website URL"
            name="site"
          />
          <div className="flex gap-2 w-full">
            <input
              type="text"
              className="myInput "
              placeholder="Enter username"
              name="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                type="password"
                className="myInput "
                placeholder="Enter Password"
                name="password"
              />
              <span
                className="absolute right-3 top-3 text-xl cursor-pointer "
                onClick={handelShow}
              >
                {show ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>
          <button className="bg-green-700 px-4 py-2 w-fit border-0 rounded-lg font-bold text-xl text-white hover:bg-green-400  flex gap-2 justify-center items-center ">
            <BiSave className="text-2xl" /> <span>Save</span>
          </button>
        </div>

        <div className="mt-10">
          <h1 className="text-2xl font-bold py-5">Your Passwords</h1>
          <table className=" w-full  table-auto overflow-hidden rounded-md">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
              </tr>
            </thead>
            <tbody className="bg-green-50">
              <tr>
                <td className="text-center w-32 py-2 border border-white">
                  example.com
                </td>
                <td className="text-center w-32 py-2 border border-white">
                  example
                </td>
                <td className="text-center w-32 py-2 border border-white">
                  kakad016
                </td>
              </tr>
              <tr>
                <td className="text-center w-32 py-2 border border-white">
                  x.com
                </td>
                <td className="text-center w-32 py-2 border border-white">
                  Eaglesma
                </td>
                <td className="text-center w-32 py-2 border border-white">
                  1972skskd
                </td>
              </tr>
              <tr>
                <td className="text-center w-32 py-2 border border-white">
                  abx.com
                </td>
                <td className="text-center w-32 py-2 border border-white">
                  Eire
                </td>
                <td className="text-center w-32 py-2 border border-white">
                  sd5d6
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
