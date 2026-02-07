import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
const app = express();
app.use(cors());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieparser());

//routes

import userRouter from "./routes/users.route";

//routes declaration

app.use("/api/v1/users", userRouter);
export default app;
