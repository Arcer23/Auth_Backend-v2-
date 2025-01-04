import express from "express";
const app = express();
import connectDB from "./database/db.js";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import bodyParser from "body-parser";

connectDB();

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied , Admins Only" });
  }
  next();
};
app.use(morgan("dev"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api/users", userRouter);


export default app;