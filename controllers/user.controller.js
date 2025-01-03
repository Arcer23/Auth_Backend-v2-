const userSerivce = require("../services/user.service");
import userModel from "../models/user.model";
import { ExpressValidator } from "express-validator";
import { validationResult } from "express-validator";

async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
   const user = userSerivce.createUser(req.body);
   const token = await user.genetateAuthToken();
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send(error.message);
  }

}