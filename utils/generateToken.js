import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

export default generateToken;
