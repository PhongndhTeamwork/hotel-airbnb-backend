import express from "express";
import {
  getHotelAsCustomer,
  createBooking,
  getBooking,
  deleteBooking,
  getBookingDetail,
  createFeedback,
  getFeedback,
  deleteFeedback,
  getRoomAsCustomer,
  createCheckoutSession,
  // updateBooking,
  updateBookingStatus,
} from "../controllers/customer.js";
import isAuth from "../middlewares/is-auth.js";
import checkRole from "../middlewares/check-role.js";

const router = express.Router();

router.get("/get-hotel-as-customer", getHotelAsCustomer);
router.get("/get-room-as-customer/:hotelId", checkRole, getRoomAsCustomer);

router.post("/create-booking/:roomId", isAuth, checkRole, createBooking);
router.get("/get-booking", isAuth, checkRole, getBooking);
router.get(
  "/get-booking-detail/:bookingId",
  isAuth,
  checkRole,
  getBookingDetail
);
router.put(
  "/update-booking-status/:bookingId",
  isAuth,
  checkRole,
  updateBookingStatus
);
router.delete("/delete-booking/:bookingId", isAuth, checkRole, deleteBooking);

router.post("/create-feedback/:hotelId", isAuth, checkRole, createFeedback);
router.get("/get-feedback/:hotelId", getFeedback);
router.delete(
  "/delete-feedback/:feedbackId",
  isAuth,
  checkRole,
  deleteFeedback
);

router.post("/create-checkout-session", createCheckoutSession);

export { router };
