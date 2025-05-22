import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";

const router = express.Router();

router.post("/register", validateRegister, handleValidation, registerUser);
router.post("/login", validateLogin, handleValidation, loginUser);

export default router;
