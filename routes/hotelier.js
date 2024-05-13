import express from "express";
import {
  createHotel,
  deleteHotel,
  updateHotel,
} from "../controllers/hotelier.js";
import isAuth from "../middlewares/is-auth.js";

const router = express.Router();

router.post("/create-hotel", isAuth, createHotel);
router.put("/update-hotel/:hotel_id", isAuth, updateHotel);
router.delete("/delete-hotel/:hotel_id", isAuth, deleteHotel);

export { router };
