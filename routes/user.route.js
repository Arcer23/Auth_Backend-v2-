import { Router } from "express";
import userController from "../controllers/user.controller";
import { body } from "express-validator";
const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  userController.createUser
);
