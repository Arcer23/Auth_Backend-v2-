import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [5, "Email must be at least 5 characters long"],
    maxLength: [50, "Email must be at most 50 characters long"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
});
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function (password) {
  const user = await this.constructor.findById(this._id).select("+password");
  return await bcrypt.compare(password, user.password);
};

userSchema.methods.generateAuthToken = async function () {
  return await jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default mongoose.model("user", userSchema);
