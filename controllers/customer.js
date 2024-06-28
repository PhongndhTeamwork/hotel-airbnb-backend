import { Hotel } from "../models/hotel.js";
import { Booking } from "../models/booking.js";
import { Feedback } from "../models/feedback.js";
import { Room } from "../models/room.js";
import { stripe } from "../app.js";

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

export const getRoomAsCustomer = (req, res) => {
  const { hotelId } = req.params;
  const { pageSize, pageNumber } = req.query;
  const userRole = req.role;

  if (userRole == 0) {
    Room.getRoom(res, hotelId, pageSize, pageNumber);
  }
};

export const createBooking = (req, res) => {
  const customerId = req.id;
  const userRole = req.role;
  const { roomId } = req.params;
  const { stayingDate, leavingDate } = req.body;
  console.log(roomId, customerId, stayingDate, leavingDate);

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

export const updateBookingStatus = (req, res) => {
  const customerId = req.id;
  const userRole = req.role;

  const { bookingId } = req.params;

  if (userRole == 0) {
    Booking.updateBookingStatus(res, customerId, bookingId);
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
  const userRole = req.role;
  const customerId = req.id;

  if (userRole == 0) {
    Feedback.deleteFeedback(res, feedbackId, customerId);
  }
};

export const createCheckoutSession = (req, res) => {
  const { roomId, stayingDate, leavingDate, successUrl, cancelUrl } = req.body;

  Room.getRoomAndHotelDetail(roomId)
    .then((roomDetails) => {
      if (!roomDetails) {
        return res.status(404).send({ error: "Room not found" });
      }

      const { hotelName, hotelAddress, roomPrice, roomType } = roomDetails;
      const amount =
        roomPrice * calculateNights(stayingDate, leavingDate) * 100;

      const description = `Hotel information:\n - Name: ${hotelName}\n- Address: ${hotelAddress}\n\nRoom information:\n- Type: ${roomType}\n\nBooking detail:\n- From: ${stayingDate}\n- To: ${leavingDate}`;

      return stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Booking at ${hotelName}`,
                description: description,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
    })
    .then((session) => {
      res.status(200).send({ sessionId: session.id });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

// Helper function
const calculateNights = (stayingDate, leavingDate) => {
  const stayDate = new Date(stayingDate);
  const leaveDate = new Date(leavingDate);
  const diffTime = Math.abs(leaveDate - stayDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
