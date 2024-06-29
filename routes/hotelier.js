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
  createImage,
  deleteImage,
  addService,
  getServiceByHotelier,
  deleteServiceByHotelier,
  getImage,
  updateImage,
  deleteAllServicesByHotelier,
  deleteEachImage,
  getBookingAsHotelier,
} from "../controllers/hotelier.js";
import isAuth from "../middlewares/is-auth.js";
import checkRole from "../middlewares/check-role.js";

const router = express.Router();

router.post("/create-hotel", isAuth, checkRole, createHotel);
router.get("/get-hotel", isAuth, checkRole, getHotel);
router.put("/update-hotel/:hotelId", isAuth, checkRole, updateHotel);
router.delete("/delete-hotel/:hotelId", isAuth, checkRole, deleteHotel);

router.post("/create-room/:hotelId", checkRole, createRoom);
router.get("/get-room/:hotelId", checkRole, getRoom);
router.put("/update-room/:hotelId/:roomId", checkRole, updateRoom);
router.delete("/delete-room/:hotelId/:roomId", checkRole, deleteRoom);

router.post("/create-image/:id", checkRole, createImage);
router.get("/get-image/:id", getImage);
router.put("/update-image/:id", isAuth, checkRole, updateImage);
router.delete("/delete-image/:id", isAuth, checkRole, deleteImage);
router.delete(
  "/delete-each-image/:id/:imageId",
  isAuth,
  checkRole,
  deleteEachImage
);

router.post("/add-service/:hotelId", isAuth, checkRole, addService);
router.get("/get-service-by-hotelier/:hotelId", getServiceByHotelier);
router.delete(
  "/delete-all-services/:hotelId",
  isAuth,
  checkRole,
  deleteAllServicesByHotelier
);
router.delete(
  "/delete-service-by-hotelier/:hotelId",
  isAuth,
  checkRole,
  deleteServiceByHotelier
);

router.get("/get-booking-as-hotelier", isAuth, checkRole, getBookingAsHotelier);
export { router };
