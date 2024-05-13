import database from "../utils/database.js";

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
      .then(() => {
        res.json("Success");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }

  //!UPDATE HOTEL
  static updateHotel(
    res,
    hotel_id,
    room_id,
    type,
    price,
    area,
    image,
    service
  ) {
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
  static deleteHotel(res, hotel_id, room_id) {
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
