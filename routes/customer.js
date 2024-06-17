import express from "express";
import {
  getHotelAsCustomer,
  createBooking,
  getBooking,
  deleteBooking,
  getBookingDetail,
} from "../controllers/customer.js";
import isAuth from "../middlewares/is-auth.js";
import checkRole from "../middlewares/check-role.js";

const router = express.Router();

router.get("/get-hotel-as-customer", checkRole, getHotelAsCustomer);
router.post("/create-booking/:roomId", isAuth, checkRole, createBooking);
router.get("/get-booking", isAuth, checkRole, getBooking);
router.get(
  "/get-booking-detail/:bookingId",
  isAuth,
  checkRole,
  getBookingDetail
);
router.delete("/delete-booking/:bookingId", isAuth, checkRole, deleteBooking);

export { router };
