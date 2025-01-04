import userModel from "../models/user.model.js";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashpassword = await userModel.hashPassword(password);
    const role = role || "user";
    const user = new userModel({
      username: username,
      email: email,
      password: hashpassword,
      role: role,
    });
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Invalid Password or Credentials" });
    }

    const token = await user.generateAuthToken();

    // Exclude password from the user object
    const { password: _, ...userData } = user.toObject(); // Exclude password
    return res.status(200).json({ user: userData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};
