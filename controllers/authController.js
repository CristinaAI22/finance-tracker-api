import { User } from "../models/User.js";
import hashPass from "../utils/hashPassword.js";
import comparePass from "../utils/comparePassword.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ msg: "Email in use" });

  const hashedPass = await hashPass(password);
  const user = await User.create({ name, email, password: hashedPass });

  const token = generateToken(user._id);
  res.status(201).json({ token });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await comparePass(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = generateToken(user._id);
  res.status(200).json({ token });
});
