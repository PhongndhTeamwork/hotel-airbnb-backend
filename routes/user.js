import express from "express";

import { getProfile, updateProfile } from "../controllers/user.js";
import isAuth from "../middlewares/is-auth.js";

const router = express.Router();

router.get("/get-profile", isAuth, getProfile);
router.put("/update-profile", isAuth, updateProfile);

export { router };
