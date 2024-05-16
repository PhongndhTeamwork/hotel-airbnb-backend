import { Hotel } from "../models/hotel.js";
import { Room } from "../models/room.js";

//!CREATE HOTEL
export const createHotel = (req, res) => {
  const { name, address, price, star, description, service, image } = req.body;
  const user_id = req.id;

  const hotel = new Hotel(
    name,
    address,
    price,
    star,
    description,
    service,
    image
  );
  hotel.createHotel(res, user_id);
};

//! GET HOTEL
export const getHotel = (req, res) => {
  const { pageSize, pageNumber } = req.query;
  const user_id = req.id;
  Hotel.getHotel(res, user_id, pageSize, pageNumber);
};

//!UPDATE HOTEL
export const updateHotel = (req, res) => {
  const { name, address, price, star, description, service, image } = req.body;
  const user_id = req.id;
  const { hotel_id } = req.params;

  Hotel.updateHotel(
    res,
    user_id,
    hotel_id,
    name,
    address,
    price,
    star,
    description,
    service,
    image
  );
};

//!DELETE HOTEL
export const deleteHotel = (req, res) => {
  const user_id = req.id;
  const { hotel_id } = req.params;

  Hotel.deleteHotel(res, user_id, hotel_id);
};

//! CREATE ROOM
export const createRoom = (req, res) => {
  const { hotel_id } = req.params;
  const { type, price, area, image, service } = req.body;

  const room = new Room(type, price, area, image, service);
  room.createRoom(res, hotel_id);
};

//! GET ROOM
export const getRoom = (req, res) => {
  const { pageSize, pageNumber } = req.query;
  const { hotel_id } = req.params;
  Room.getRoom(res, hotel_id, pageSize, pageNumber);
};

//! UPDATE ROOM
export const updateRoom = (req, res) => {
  const { hotel_id, room_id } = req.params;
  const { type, price, area, image, service } = req.body;

  Room.updateRoom(res, hotel_id, room_id, type, price, area, image, service);
};

//! DELETE ROOM
export const deleteRoom = (req, res) => {
  const { hotel_id, room_id } = req.params;
  Room.deleteRoom(res, hotel_id, room_id);
};
