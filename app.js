import express from "express";
const app = express();
import connectDB from "./database/db.js";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import bodyParser from "body-parser";

connectDB();

app.use(morgan("dev"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api/users", userRouter);


export default app;