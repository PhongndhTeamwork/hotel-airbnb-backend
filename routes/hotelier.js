import express from "express";
import {
  createHotel,
  getHotel,
  deleteHotel,
  updateHotel,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/hotelier.js";
import isAuth from "../middlewares/is-auth.js";

const router = express.Router();

router.post("/create-hotel", isAuth, createHotel);
router.get("/get-hotel", isAuth, getHotel);
router.put("/update-hotel/:hotel_id", isAuth, updateHotel);
router.delete("/delete-hotel/:hotel_id", isAuth, deleteHotel);

router.post("/create-room/:hotel_id", createRoom);
router.get("/get-room/:hotel_id", getRoom);
router.put("/update-room/:hotel_id/:room_id", updateRoom);
router.delete("/delete-room/:hotel_id/:room_id", deleteRoom);
export { router };
