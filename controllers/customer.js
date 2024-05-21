import { Hotel } from "../models/hotel.js";

export const getHotelAsCustomer = (req, res) => {
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
};
