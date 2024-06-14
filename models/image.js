import database from "../utils/database.js";

export class Image {
  constructor(imagePath) {
    this.imagePath = imagePath;
  }

  //!CREATE IMAGE
  createImage(res, id, imageType) {
    let createImageQuery = database;
    if (imageType == 0) {
      createImageQuery = createImageQuery.insert({
        hotel_id: id,
        image_path: this.imagePath,
      });
    } else {
      createImageQuery = createImageQuery.insert({
        room_id: id,
        image_path: this.imagePath,
      });
    }
    createImageQuery
      .into("image")
      .then(() => {
        console.log("Success");
        res.json("Success");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }

  //! GET IMAGE
  static getImage(res, hotelId, roomId) {
    database("image")
      .where("hotel_id", "=", hotelId)
      .orderBy("id")
      .select("*")
      .then((images) => {
        res.status(200).json(images);
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }

  //!UPDATE IMAGE
  static updateImage(res, hotelId, roomId, imagePath) {
    database("image")
      .where("hotel_id", "=", hotelId)
      .update({
        imagePath: imagePath,
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

  //!DELETE IMAGE
  static deleteImage(res, id, imageType, hotelierId) {
    let deleteImageQuery = database("image");

    if (imageType == 0) {
      deleteImageQuery = deleteImageQuery
        .join("hotel", "hotel.id", "=", "image.hotel_id")
        .where("hotel.hotelier_id", "=", hotelierId)
        .andWhere("hotel_id", "=", id);
    } else {
      deleteImageQuery = deleteImageQuery
        .join("room", "room.id", "=", "image.room_id")
        .join("hotel", "hotel.id", "=", "room.hotel_id")
        .where("hotel.hotelier_id", "=", hotelierId)
        .andWhere("room_id", "=", id);
    }
    deleteImageQuery
      .del()
      .then((data) => {
        res.json("Deleted!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }
}
