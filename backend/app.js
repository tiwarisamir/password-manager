import express from "express";
import userRouter from "./routes/user.js";
import passwordRouter from "./routes/password.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/api/users", userRouter);
app.use("/api/password", passwordRouter);

app.get("/", (req, res) => {
  res.send("Hey there");
});

app.use(errorMiddleware);
