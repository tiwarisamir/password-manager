import { useContext, useEffect, useRef, useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Context } from "../store/store";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main";

const Manager = () => {
  const [show, setshow] = useState(false);
  const passwordRef = useRef();
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setpasswordArray] = useState([]);
  const { isAuth, login } = useContext(Context);
  const [refresh, setrefresh] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [toUpdateID, settoUpdateID] = useState("");

  useEffect(() => {
    axios
      .get(`${server}password/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setpasswordArray(res.data.password);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

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

  const handleSave = async () => {
    if (
      form.site.length != 0 &&
      form.username.length != 0 &&
      form.password.length != 0
    ) {
      try {
        const { data } = await axios.post(
          `${server}password/new`,
          {
            site: form.site,
            username: form.username,
            password: form.password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setform({ site: "", username: "", password: "" });
        toast.success(data.message);
        setrefresh(!refresh);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Enter site, username and password first!!");
    }
  };

  const handleDelete = async (id) => {
    let conf = confirm("Do you really wnat to delete password?");
    if (conf) {
      try {
        const { data } = await axios.delete(`${server}password/${id}`, {
          withCredentials: true,
        });
        toast.success(data.message);
        setrefresh(!refresh);
      } catch (error) {
        toast.success(error.response.data.message);
      }
    }
  };

  const handleEdit = (id) => {
    setform(passwordArray.filter((item) => item._id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item._id != id));
    setisUpdate(true);
    settoUpdateID(id);
  };

  const handleUpdate = async () => {
    if (
      form.site.length != 0 &&
      form.username.length != 0 &&
      form.password.length != 0
    ) {
      try {
        const { data } = await axios.put(
          `${server}password/${toUpdateID}`,
          {
            site: form.site,
            username: form.username,
            password: form.password,
          },
          {
            withCredentials: true,
          }
        );
        setform({ site: "", username: "", password: "" });
        toast.success(data.message);
        setrefresh(!refresh);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Enter site, username and password first!!");
    }
  };

  const copyText = (text) => {
    toast.success("Copied to clipboard");
    navigator.clipboard.writeText(text);
  };

  const handleTablePassword = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}password/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      setrefresh(!refresh);
    } catch (error) {}
  };

  if (!isAuth) return <Navigate to={"/login"} />;

  return (
    <>
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
            required
          />
          <div className="flex flex-col gap-2 md:flex-row w-full">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              className="myInput "
              placeholder="Enter username"
              name="username"
              required
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
                required
              />
              <span
                className="absolute right-3 top-3 text-xl cursor-pointer bg-slate-200 p-2 rounded-full  "
                onClick={handelShow}
              >
                {show ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>
          {isUpdate ? (
            <button
              className="bg-cyan-700 px-5 py-2 mt-5 w-fit border-0 rounded-md font-bold text-xl text-white hover:bg-cyan-600  flex gap-2 justify-center items-center "
              onClick={() => handleUpdate()}
            >
              Update
            </button>
          ) : (
            <button
              className="bg-cyan-700 px-5 py-2 mt-5 w-fit border-0 rounded- fonmdt-bold text-xl text-white hover:bg-cyan-600  flex gap-2 justify-center items-center "
              onClick={handleSave}
            >
              <BiSave className="text-2xl" /> <span>Save</span>
            </button>
          )}
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
              <tbody className="bg-cyan-100">
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
                            onClick={() => handleTablePassword(item._id)}
                          >
                            {item.showPassword ? <IoEyeOff /> : <IoEye />}
                          </span>
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex items-center justify-center gap-3 text-xl">
                          <FaRegEdit
                            className="cursor-pointer"
                            onClick={() => handleEdit(item._id)}
                          />
                          <MdDelete
                            className="cursor-pointer"
                            onClick={() => handleDelete(item._id)}
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
