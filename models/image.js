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
  static getImage(res, id, imageType) {
    let getImageQuery = database("image");
    if (imageType == 0) {
      getImageQuery = getImageQuery.where("hotel_id", "=", id);
    } else {
      getImageQuery = getImageQuery.where("room_id", "=", id);
    }
    getImageQuery
      .select("*")
      .then((images) => {
        res.json(images);
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }

  //!UPDATE IMAGE
  static updateImage(res, id, imageType, imagePath, hotelierId) {
    let updateImageQuery = database("image");
    if (imageType == 0) {
      updateImageQuery = updateImageQuery
        .join("hotel", "hotel.id", "=", "image.hotel_id")
        .where("image.hotel_id", "=", id)
        .andWhere("hotel.hotelier_id", "=", hotelierId);
    } else {
      updateImageQuery = updateImageQuery
        .join("room", "room.id", "=", "image.room_id")
        .join("hotel", "room.hotel_id", "=", "hotel.id")
        .where("room_id", "=", id)
        .andWhere("hotel.hotelier_id", "=", hotelierId);
    }
    updateImageQuery
      .select("image.id")
      .then((imageIds) => {
        const imageId = imageIds[0].id;
        return database("image")
          .where("id", "=", imageId)
          .update({
            image_path: imagePath,
          })
          .returning("*");
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json("Error");
        console.log(err);
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
