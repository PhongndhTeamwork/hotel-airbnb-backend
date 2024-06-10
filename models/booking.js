import database from "../utils/database.js";

export class Booking {
  constructor(stayingDate, leavingDate) {
    this.stayingDate = stayingDate;
    this.leavingDate = leavingDate;
  }

  //! CREATE BOOKING
  static createBooking(res, roomId, customerId) {
    database
      .insert({
        customer_id: customerId,
        room_id: roomId,
        staying_date: this.stayingDate,
        leaving_date: this.leavingDate,
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
}
