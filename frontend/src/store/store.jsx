import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { server } from "../main";

export const Context = createContext({
  isAuth: false,
  user: {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

const ContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [user, setuser] = useState({});
  const [refresh, setrefresh] = useState(false);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${server}users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setisAuth(true);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuth(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      console.log("register info: ", username, password, email);
      const { data } = await axios.post(
        `${server}users/register`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setisAuth(true);
      setrefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
      setisAuth(false);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.get(`${server}users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setisAuth(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuth(true);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setuser(res.data.user);
        setisAuth(true);
      })
      .catch((error) => {
        setuser({});
        setisAuth(false);
      });
  }, [refresh]);

  return (
    <Context.Provider
      value={{
        isAuth,
        login,
        register,
        logout,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
