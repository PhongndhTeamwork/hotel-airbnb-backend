import database from "../utils/database.js";

export class Hotel {
  constructor(name, address, price, star, description, service, image) {
    (this.name = name),
      (this.address = address),
      (this.price = price),
      (this.star = star),
      (this.description = description),
      (this.service = service),
      (this.image = image);
  }

  //!CREATE HOTEL
  createHotel(res, hotelier_id) {
    database
      .insert({
        hotelier_id: hotelier_id,
        name: this.name,
        address: this.address,
        price: this.price,
        star: this.star,
        description: this.description,
        service: this.service,
        image: this.image,
      })
      .into("hotel")
      .then(() => {
        console.log("Success");
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
    hotelier_id,
    hotel_id,
    name,
    address,
    price,
    star,
    description,
    service,
    image
  ) {
    database("hotel")
      .where("id", "=", hotel_id)
      .andWhere("hotelier_id", "=", hotelier_id)
      .update({
        name: name,
        address: address,
        price: price,
        star: star,
        description: description,
        service: service,
        image: image,
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

  //!DELETE HOTEL
  static deleteHotel(res, hotelier_id, hotel_id) {
    database("hotel")
      .where("id", "=", hotel_id)
      .andWhere("hotelier_id", "=", hotelier_id)
      .del()
      .then((data) => {
        res.json("Deleted!");
      })
      .catch((err) => {
        res.status(400).json("Error!");
      });
  }
}
