import { Hotel } from "../models/hotel.js";
import { Booking } from "../models/booking.js";
import { Feedback } from "../models/feedback.js";

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
  const customerId = req.id;
  const userRole = req.role;
  const { roomId } = req.params;
  const { stayingDate, leavingDate } = req.body;

  if (userRole == 0) {
    Booking.createBooking(res, roomId, customerId, stayingDate, leavingDate);
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

export const getBookingDetail = (req, res) => {
  const customerId = req.id;
  const userRole = req.role;

  const { bookingId } = req.params;

  if (userRole == 0) {
    Booking.getBookingDetail(res, customerId, bookingId);
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

export const createFeedback = (req, res) => {
  const { hotelId } = req.params;
  const { review, rating } = req.body;
  const customerId = req.id;
  const userRole = req.role;

  if (userRole == 0) {
    const feedback = new Feedback(review, rating);

    feedback.createFeedback(res, hotelId, customerId);
  }
};

export const getFeedback = (req, res) => {
  const { hotelId } = req.params;
  const { pageSize, pageNumber } = req.query;

  Feedback.getFeedback(res, hotelId, pageSize, pageNumber);
};

export const deleteFeedback = (req, res) => {
  const { feedbackId } = req.params;
  const customerId = req.id;
  const userRole = req.role;

  if (userRole == 0) {
    Feedback.deleteFeedback(res, feedbackId, customerId);
  }
};
