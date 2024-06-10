import { Hotel } from "../models/hotel.js";
import { Booking } from "../models/booking.js";

export const getHotelAsCustomer = (req, res) => {
  const userRole = req.userRole;
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

  if (userRole == 0) {
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
    Booking.createBooking(res, roomId, userId);
  }
};
