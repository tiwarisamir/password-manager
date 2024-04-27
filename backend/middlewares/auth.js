import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Please Login First",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SCRET);

  req.user = await User.findById(decode._id);

  next();
};
