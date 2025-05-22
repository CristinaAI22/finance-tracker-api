import { body } from "express-validator";

export const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 characters long"),
];

export const validateLogin = [
  body("email").notEmpty().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];
