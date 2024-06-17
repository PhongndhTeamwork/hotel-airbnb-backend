import database from "../utils/database.js";
import { Pagination } from "./pagination.js";

export class Room {
  constructor(type, price, area) {
    (this.type = type), (this.price = price), (this.area = area);
  }

  //!CREATE ROOM
  createRoom(res, hotelId) {
    database
      .insert({
        hotel_id: hotelId,
        type: this.type,
        price: this.price,
        area: this.area,
      })
      .into("room")
      .returning("*")
      .then((data) => {
        // res.json("Success");
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }

  //! GET ROOM
  static getRoom(res, hotelId, pageSize, pageNumber) {
    database("room")
      .where("hotel_id", "=", hotelId)
      .select("*")
      .then((allRooms) => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const rooms = allRooms.slice(startIndex, endIndex);
        const pageTotal = Math.ceil(allRooms.length / pageSize);
        res.json(new Pagination(pageSize, pageNumber, pageTotal, rooms));
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }

  //! GET ROOM DETAIL
  static getRoomDetail(res, roomId) {
    database("room")
      .where("id", "=", roomId)
      .select("*")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json("Error!");
      });
  }

  //!UPDATE ROOM
  static updateRoom(res, hotelId, roomId, type, price, area) {
    database("room")
      .where("hotel_id", "=", hotelId)
      .andWhere("id", "=", roomId)
      .update({
        type: type,
        price: price,
        area: area,
      })
      .returning("*")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }

  //!DELETE ROOM
  static deleteRoom(res, hotelId, roomId) {
    database("room")
      .where("hotel_id", "=", hotelId)
      .andWhere("id", "=", roomId)
      .del()
      .then(() => {
        res.json("Deleted!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }
}
