import express from "express";
import {
  createImage,
  deleteImage,
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
import checkRole from "../middlewares/check-role.js";

const router = express.Router();

router.post("/create-image/:id", checkRole, createImage);
router.delete("/delete-image/:id", isAuth, checkRole, deleteImage);

router.post("/create-hotel", isAuth, checkRole, createHotel);
router.get("/get-hotel", isAuth, checkRole, getHotel);
router.put("/update-hotel/:hotelId", isAuth, checkRole, updateHotel);
router.delete("/delete-hotel/:hotelId", isAuth, checkRole, deleteHotel);

router.post("/create-room/:hotelId", checkRole, createRoom);
router.get("/get-room/:hotelId", checkRole, getRoom);
router.put("/update-room/:hotelId/:roomId", checkRole, updateRoom);
router.delete("/delete-room/:hotelId/:roomId", checkRole, deleteRoom);
export { router };
