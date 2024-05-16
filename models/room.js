import database from "../utils/database.js";
import { Pagination } from "./pagination.js";

export class Room {
  constructor(type, price, area, image, service) {
    (this.type = type),
      (this.price = price),
      (this.area = area),
      (this.image = image),
      (this.service = service);
  }

  //!CREATE ROOM
  createRoom(res, hotel_id) {
    database
      .insert({
        hotel_id: hotel_id,
        type: this.type,
        price: this.price,
        area: this.area,
        image: this.image,
        service: this.service,
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
  static getRoom(res, hotel_id, pageSize, pageNumber) {
    database("room")
      .where("hotel_id", "=", hotel_id)
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

  //!UPDATE ROOM
  static updateRoom(res, hotel_id, room_id, type, price, area, image, service) {
    database("room")
      .where("hotel_id", "=", hotel_id)
      .andWhere("id", "=", room_id)
      .update({
        type: type,
        price: price,
        area: area,
        image: image,
        service: service,
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
  static deleteRoom(res, hotel_id, room_id) {
    database("room")
      .where("hotel_id", "=", hotel_id)
      .andWhere("id", "=", room_id)
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
