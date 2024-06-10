import express from "express";
import { getHotelAsCustomer, createBooking, getBooking, deleteBooking } from "../controllers/customer.js";

const router = express.Router();

router.get("/get-hotel-as-customer", getHotelAsCustomer);
router.post("/create-booking", createBooking);
router.get("/get-booking", getBooking);
router.delete("/delete-booking/:bookingId", deleteBooking);

export { router };
