import User from "../models/user.model.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const handleRegisterUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created succeessfully" });
  } catch (error) {
    console.log("error in register user controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all feild are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Must be true for HTTPS
        sameSite: "none", // Must be "none" for cross-origin
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "Login successfully",
        username: user.username,
        email: user.email,
      });
  } catch (error) {
    console.log("Error in handleLoginUser : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { handleRegisterUser, handleLoginUser };
