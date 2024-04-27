import ErrorHandler from "../middlewares/error.js";
import { Password } from "../models/password.js";

export const newPassword = async (req, res, next) => {
  try {
    const { site, username, password } = req.body;
    await Password.create({
      site,
      username,
      password,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Password added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getPassword = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const password = await Password.find({ user: userid });

    res.status(200).json({
      success: true,
      password,
    });
  } catch (error) {
    next(error);
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    const prevPassword = await Password.findById(req.params.id);

    if (!prevPassword) return next(new ErrorHandler("Site not found", 404));

    if (!req.body.site) {
      console.log("showPassword clicked");
      prevPassword.showPassword = !prevPassword.showPassword;
    } else {
      (prevPassword.site = req.body.site),
        (prevPassword.username = req.body.username),
        (prevPassword.password = req.body.password);
    }

    await prevPassword.save();

    res.status(200).json({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    next(error);
  }
};
export const deletePassword = async (req, res, next) => {
  try {
    const password = await Password.findById(req.params.id);

    if (!password) return next(new ErrorHandler("Password not found", 404));

    await password.deleteOne();

    res.status(200).json({
      success: true,
      message: "Password deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
