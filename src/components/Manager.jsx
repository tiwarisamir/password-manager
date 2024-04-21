import { useEffect, useRef, useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

const Manager = () => {
  const [show, setshow] = useState(false);
  const passwordRef = useRef();
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
    showPassword: false,
  });
  const [passwordArray, setpasswordArray] = useState([]);
  // const [showTablePassword, setshowTablePassword] = useState(form.showPassword);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handelShow = () => {
    // const newShowState = !show;
    // setshow(newShowState);
    // if (passwordRef.current) {
    //   passwordRef.current.type = newShowState ? "text" : "password";
    // }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (
      form.site.length != 0 &&
      form.username.length != 0 &&
      form.password.length != 0
    ) {
      toast.success("Password added successfully");

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
    }
  };

  const handleDelete = (id) => {
    toast.error("Password Deleted!!!");
    let conf = confirm("Do you really wnat to delete password?");
    if (conf) {
      setpasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
    }
  };

  const handleEdit = (id) => {
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const copyText = (text) => {
    toast.success("Copied to clipboard");
    navigator.clipboard.writeText(text);
  };

  const handleTablePassword = (id) => {
    setpasswordArray((prevPasswords) =>
      prevPasswords.map((item) =>
        item.id === id ? { ...item, showPassword: !item.showPassword } : item
      )
    );
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg--400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="max-w-4xl p-5  mx-auto min-h-[83.7vh]">
        <div className=" text-center py-10">
          <div className="text-3xl font-bold">
            <span className="text-cyan-500">Pass</span>Man*
          </div>
          <p className="text-cyan-600  font-semibold ">
            Your Own Password Manager
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 mx-auto ">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            className="myInput "
            placeholder="Enter website URL"
            name="site"
          />
          <div className="flex flex-col gap-2 md:flex-row w-full">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              className="myInput "
              placeholder="Enter username"
              name="username"
            />
            <div className="relative w-full">
              <input
                value={form.password}
                onChange={handleChange}
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
          <button
            className="bg-cyan-700 px-5 py-2 mt-5 w-fit border-0 rounded-full font-bold text-xl text-white hover:bg-cyan-600  flex gap-2 justify-center items-center "
            onClick={handleSave}
          >
            <BiSave className="text-2xl" /> <span>Save</span>
          </button>
        </div>

        <div className="mt-10">
          <h1 className="text-2xl font-bold py-5">Your Passwords</h1>
          {passwordArray.length === 0 && <div> No Password to show </div>}
          {passwordArray.length != 0 && (
            <table className=" w-full  table-auto overflow-hidden rounded-md">
              <thead className="bg-cyan-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-cyan-50">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 py-2 border border-white">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex justify-center items-center gap-3">
                          <span>{item.username}</span>
                          <MdOutlineContentCopy
                            className="cursor-pointer"
                            onClick={() => copyText(item.username)}
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex justify-center items-center gap-3">
                          {item.showPassword && <span> {item.password}</span>}
                          {!item.showPassword && (
                            <span className="font-bold">
                              {"*".repeat(item.password.length)}
                            </span>
                          )}

                          <MdOutlineContentCopy
                            className="cursor-pointer"
                            onClick={() => copyText(item.password)}
                          />
                          <span
                            className="cursor-pointer"
                            onClick={() => handleTablePassword(item.id)}
                          >
                            {item.showPassword ? <IoEyeOff /> : <IoEye />}
                          </span>
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex items-center justify-center gap-3 text-xl">
                          <FaRegEdit
                            className="cursor-pointer"
                            onClick={() => handleEdit(item.id)}
                          />
                          <MdDelete
                            className="cursor-pointer"
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
