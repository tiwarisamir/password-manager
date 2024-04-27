import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/cookie.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ username, email, password: hashedPassword });

    sendCookie(user, res, "Registered Sucessfully", 201);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User not found", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `welcome back ${user.username}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Loged Out Successfully",
    });
};
