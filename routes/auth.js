import express from "express";
import {
  signin,
  signupAsCustomer,
  signupAsHotelier,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup-as-customer", signupAsCustomer);
router.post("/signup-as-hotelier", signupAsHotelier);
router.post("/signin", signin);

export { router };
