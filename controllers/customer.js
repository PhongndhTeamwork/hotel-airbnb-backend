import { Hotel } from "../models/hotel.js";
import { Booking } from "../models/booking.js";

export const getHotelAsCustomer = (req, res) => {
  const role = req.role;
  const {
    pageSize,
    pageNumber,
    stayingDate,
    leavingDate,
    roomType,
    hotelName,
    hotelAddress,
    roomNumber,
  } = req.query;

  if (role == 0) {
    Hotel.getHotelAsCustomer(
      res,
      stayingDate,
      leavingDate,
      roomType,
      hotelName,
      hotelAddress,
      roomNumber,
      pageSize,
      pageNumber
    );
  }
};

export const createBooking = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  const { roomId } = req.params;
  const { stayingDate, leavingDate } = req.body;

  if (userRole == 0) {
    Booking.createBooking(res, roomId, userId, stayingDate, leavingDate);
  }
};

export const getBooking = (req, res) => {
  const customerId = req.id;
  const userRole = req.role;
  const { pageSize, pageNumber } = req.query;

  if (userRole == 0) {
    Booking.getBooking(res, customerId, pageSize, pageNumber);
  }
};

export const deleteBooking = (req, res) => {
  const customerId = req.id;
  const userRole = req.role;
  const { bookingId } = req.params;
  if (userRole == 0) {
    Booking.deleteBooking(res, customerId, bookingId);
  }
};
