import express from "express";
import {
  getHotelAsCustomer,
  createBooking,
  getBooking,
  deleteBooking,
} from "../controllers/customer.js";
import checkRole from "../middlewares/check-role.js";

const router = express.Router();

router.get("/get-hotel-as-customer", checkRole, getHotelAsCustomer);
router.post("/create-booking", checkRole, createBooking);
router.get("/get-booking", checkRole, getBooking);
router.delete("/delete-booking/:bookingId", checkRole, deleteBooking);

export { router };
