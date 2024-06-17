import database from "../utils/database.js";
import { Pagination } from "./pagination.js";

export class Hotel {
  constructor(name, address, price, star, description) {
    (this.name = name),
      (this.address = address),
      (this.price = price),
      (this.star = star),
      (this.description = description);
  }

  //!CREATE HOTEL
  createHotel(res, hotelierId) {
    database
      .insert({
        hotelier_id: hotelierId,
        name: this.name,
        address: this.address,
        price: this.price,
        star: this.star,
        description: this.description,
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

  //! GET HOTEL
  static getHotel(res, hotelierId, pageSize, pageNumber) {
    database("hotel")
      .where("hotelier_id", "=", hotelierId)
      .orderBy("id")
      .select("*")
      .then((allHotels) => {
        const startIndex = (+pageNumber - 1) * +pageSize; 
        const endIndex = startIndex + +pageSize;
        const hotels = allHotels.slice(startIndex, endIndex);
        const pageTotal = Math.ceil(allHotels.length / +pageSize);
        console.log(startIndex, endIndex)
        console.log(hotels.length)
        console.log(hotels)
        res
          .status(200)
          .json(new Pagination(+pageSize, +pageNumber, pageTotal, hotels));
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }

  //! GET HOTEL DETAIL
  static getHotelDetail(res, hotelId) {
    database("hotel")
      .where("id", "=", hotelId)
      .select("*")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }

  //!UPDATE HOTEL
  static updateHotel(
    res,
    hotelierId,
    hotelId,
    name,
    address,
    price,
    star,
    description
  ) {
    database("hotel")
      .where("id", "=", hotelId)
      .andWhere("hotelier_id", "=", hotelierId)
      .update({
        name: name,
        address: address,
        price: price,
        star: star,
        description: description,
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
  static deleteHotel(res, hotelierId, hotelId) {
    database("hotel")
      .where("id", "=", hotelId)
      .andWhere("hotelier_id", "=", hotelierId)
      .del()
      .then((data) => {
        res.json("Deleted!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }

  //! GET HOTEL AS CUSTOMER
  static getHotelAsCustomer(
    res,
    stayingDate,
    leavingDate,
    roomType,
    hotelName,
    hotelAddress,
    roomNumber,
    pageSize,
    pageNumber
  ) {
    let getHotelQuery = database("hotel")
      .join("room", "hotel.id", "=", "room.hotel_id")
      .leftJoin("book", "room.id", "=", "book.room_id")
      .select("hotel.*")
      .where(1, "=", 1);

    if (stayingDate !== undefined && leavingDate !== undefined) {
      getHotelQuery = getHotelQuery.andWhere(function () {
        this.where("book.staying_date", ">=", leavingDate)
          .orWhere("book.leaving_date", "<=", stayingDate)
          .orWhereNull("book.staying_date");
      });
    }
    if (roomType !== undefined) {
      getHotelQuery = getHotelQuery.andWhere("room.type", "=", roomType);
    }
    if (hotelName !== undefined) {
      let queryName = "%".concat(hotelName).concat("%");
      getHotelQuery = getHotelQuery.andWhereILike("hotel.name", queryName);
    }
    if (hotelAddress !== undefined) {
      let queryAddress = "%".concat(hotelAddress).concat("%");
      getHotelQuery = getHotelQuery.andWhereILike(
        "hotel.address",
        queryAddress
      );
    }
    getHotelQuery = getHotelQuery
      .groupBy("hotel.id")
      .having(database.raw("COUNT(room.id) >= ?", [roomNumber]));
    getHotelQuery
      .then((allHotels) => {
        console.log(allHotels);
        const startIndex = (+pageNumber - 1) * +pageSize;
        const endIndex = startIndex + +pageSize;
        const hotels = allHotels.slice(startIndex, endIndex);
        const pageTotal = Math.ceil(allHotels.length / +pageSize);
        res.json(new Pagination(pageSize, pageNumber, pageTotal, hotels));
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }
}
