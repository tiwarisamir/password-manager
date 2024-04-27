import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  deletePassword,
  getPassword,
  newPassword,
  updatePassword,
} from "../controller/password.js";

const router = express.Router();

router.post("/new", isAuth, newPassword);
router.get("/my", isAuth, getPassword);

router.route("/:id").put(isAuth, updatePassword).delete(isAuth, deletePassword);

export default router;
