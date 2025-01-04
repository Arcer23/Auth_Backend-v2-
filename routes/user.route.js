import { Router } from "express";
import { register, login } from "../controllers/user.controller.js";
import { body } from "express-validator";
const router = Router();

router.post(
  "/register",
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password"),
  register
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  login
);

export default router;
