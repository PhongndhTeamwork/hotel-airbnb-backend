import database from "../utils/database.js";
import { Pagination } from "./pagination.js";

export class Booking {
  constructor(stayingDate, leavingDate) {
    this.stayingDate = stayingDate;
    this.leavingDate = leavingDate;
  }

  //! CREATE BOOKING
  static createBooking(res, roomId, customerId, stayingDate, leavingDate) {
    database
      .insert({
        customer_id: customerId,
        room_id: roomId,
        staying_date: stayingDate,
        leaving_date: leavingDate,
      })
      .into("book")
      .returning("*")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error");
      });
  }

  //! GET BOOKING
  static getBooking(res, customerId, pageSize, pageNumber) {
    database("book")
      .where("customer_id", "=", customerId)
      .orderBy("id")
      .select("*")
      .then((allBookings) => {
        const startIndex = (+pageNumber - 1) * +pageSize;
        const endIndex = startIndex + +pageSize;
        const bookings = allBookings.slice(startIndex, endIndex);
        const pageTotal = Math.ceil(allBookings.length / +pageSize);
        res
          .status(200)
          .json(new Pagination(pageSize, pageNumber, pageTotal, bookings));
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }

  //! GET BOOKING DETAIL
  static getBookingDetail(res, customerId, bookingId) {
    database("book")
      .join("room", "book.room_id", "=", "room.id")
      .join("hotel", "hotel.id", "=", "room.hotel_id")
      .where("book.id", "=", bookingId)
      .andWhere("book.customer_id", "=", customerId)
      .orderBy("book.id")
      .select("book.*", "room.*", "hotel.*")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }

  //! DELETE BOOKING
  static deleteBooking(res, customerId, bookingId) {
    database("book")
      .where("id", "=", bookingId)
      .andWhere("customer_id", "=", customerId)
      .del()
      .then(() => {
        res.json("Deleted");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error");
      });
  }
}
