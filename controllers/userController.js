import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import comparePass from "../utils/comparePassword.js";
import hashPassword from "../utils/hashPassword.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) throw new Error("User not found");
  res.status(200).json(user);
});
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) throw new Error("User not found");

  const isMatch = await comparePass(currentPassword, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }
  user.password = await hashPassword(newPassword);
  await user.save();
  res.status(200).json({ msg: "Password updated succesfully" });
});
