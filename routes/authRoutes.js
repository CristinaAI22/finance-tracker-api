import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateUser.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updatePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", validateRegister, handleValidation, registerUser);
router.post("/login", validateLogin, handleValidation, loginUser);
router.get("/me", authenticate, getUserProfile);
router.post("/update-password", authenticate, updatePassword);

export default router;
