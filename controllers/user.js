import { Hotel } from "../models/hotel.js";
import { User } from "../models/user.js";
import { Room } from "../models/room.js";

//! GET PROFILE
export const getProfile = (req, res) => {
  const userId = req.id;
  console.log(userId);
  User.getProfile(res, userId);
};

//! UPDATE PROFILE
export const updateProfile = (req, res) => {
  const userId = req.id;
  const { name, dob, email, gender, phoneNumber } = req.body;

  User.updateProfile(res, userId, name, dob, email, gender, phoneNumber);
};

//! GET HOTEL DETAIL
export const getHotelDetail = (req, res) => {
  const { hotelId } = req.params;
  Hotel.getHotelDetail(res, hotelId);
};

//! GET ROOM DETAIL
export const getRoomDetail = (req, res) => {
  const { roomId } = req.params;
  Room.getRoomDetail(res, roomId);
};
