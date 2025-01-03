import userModel from "../models/user.model";

export const createUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const hashedPassword = await userModel.hashPassword(password);
  const user = new userModel({ email, password: hashedPassword });
  await user.save();
  return user;
};

export const authenticateUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await userModel.find({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = await user.genetateAuthToken();

  return token, user;
};
