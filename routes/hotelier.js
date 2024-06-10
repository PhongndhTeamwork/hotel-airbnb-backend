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
router.put("/update-hotel/:hotelId", isAuth, updateHotel);
router.delete("/delete-hotel/:hotelId", isAuth, deleteHotel);

router.post("/create-room/:hotelId", createRoom);
router.get("/get-room/:hotelId", getRoom);
router.put("/update-room/:hotelId/:roomId", updateRoom);
router.delete("/delete-room/:hotelId/:roomId", deleteRoom);
export { router };
