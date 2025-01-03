import express from "express";
const app = express();
import connectDB from "./database/db.js";
import morgan from "morgan";

connectDB();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


export default app;