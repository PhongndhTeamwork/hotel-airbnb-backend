import express from "express";

import {
  getProfile,
  updateProfile,
  getHotelDetail,
  getRoomDetail,
} from "../controllers/user.js";
import isAuth from "../middlewares/is-auth.js";

const router = express.Router();

router.get("/get-profile", isAuth, getProfile);
router.put("/update-profile", isAuth, updateProfile);
router.get("/get-hotel-detail/:hotelId", getHotelDetail);
router.get("/get-room-detail/:roomId", getRoomDetail);

export { router };
