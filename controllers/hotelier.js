import { Hotel } from "../models/hotel.js";
import { Room } from "../models/room.js";

//!CREATE HOTEL
export const createHotel = (req, res) => {
  const { name, address, price, star, description, service } = req.body;
  const image = req.file;
  const userId = req.id;
  const userRole = req.role;

  // console.log(image);
  console.log(userRole);
  if (userRole == 1) {
    const imageUrl = image.path;
    console.log(imageUrl);
    const hotel = new Hotel(
      name,
      address,
      price,
      star,
      description,
      service,
      imageUrl
    );
    hotel.createHotel(res, userId);
  }
};

//! GET HOTEL
export const getHotel = (req, res) => {
  const { pageSize, pageNumber } = req.query;
  const userId = req.id;
  const userRole = req.role;
  if (userRole == 1) {
    Hotel.getHotel(res, userId, pageSize, pageNumber);
  }
};

//!UPDATE HOTEL
export const updateHotel = (req, res) => {
  const { name, address, price, star, description, service, image } = req.body;
  const userId = req.id;
  const userRole = req.role;
  const { hotelId } = req.params;

  if (userRole == 1) {
    Hotel.updateHotel(
      res,
      userId,
      hotelId,
      name,
      address,
      price,
      star,
      description,
      service,
      image
    );
  }
};

//!DELETE HOTEL
export const deleteHotel = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  const { hotelId } = req.params;

  if (userRole == 1) {
    Hotel.deleteHotel(res, userId, hotelId);
  }
};

//! CREATE ROOM
export const createRoom = (req, res) => {
  const { hotelId } = req.params;
  const userRole = req.role;
  const { type, price, area, image, service } = req.body;

  if (userRole == 1) {
    const room = new Room(type, price, area, image, service);
    room.createRoom(res, hotelId);
  }
};

//! GET ROOM
export const getRoom = (req, res) => {
  const { pageSize, pageNumber } = req.query;
  const { hotelId } = req.params;
  const userRole = req.role;

  if (userRole == 1) {
    Room.getRoom(res, hotelId, pageSize, pageNumber);
  }
};

//! UPDATE ROOM
export const updateRoom = (req, res) => {
  const { hotelId, roomId } = req.params;
  const { type, price, area, image, service } = req.body;
  const userRole = req.role;

  if (userRole == 1) {
    Room.updateRoom(res, hotelId, roomId, type, price, area, image, service);
  }
};

//! DELETE ROOM
export const deleteRoom = (req, res) => {
  const { hotelId, roomId } = req.params;
  const userRole = req.role;
  if (userRole == 1) {
    Room.deleteRoom(res, hotelId, roomId);
  }
};
