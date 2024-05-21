import express from "express";
import { getHotelAsCustomer } from "../controllers/customer.js";

const router = express.Router();

router.get("/get-hotel-as-customer", getHotelAsCustomer);

export { router };
