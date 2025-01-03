import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/authentication_system")
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.error("Database connection error:", err.message, "\nStack trace:", err.stack);
    });
};

export default connectDB;