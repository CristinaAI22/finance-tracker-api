import { User, userSchema } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email in use" });
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPass });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
