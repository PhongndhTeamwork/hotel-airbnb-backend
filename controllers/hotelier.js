import { Hotel } from "../models/hotel.js";
import { Room } from "../models/room.js";
import { Image } from "../models/image.js";
import { Service } from "../models/service.js";

//!CREATE HOTEL
export const createHotel = (req, res) => {
   const { name, address, price, star, description } = req.body;
   // const image = req.file;
   const userId = req.id;
   const userRole = req.role;

   // console.log(image);
   console.log(userRole);
   if (userRole == 1) {
      // const imageUrl = image.path;
      // console.log(imageUrl);
      const hotel = new Hotel(
         name,
         address,
         price,
         star,
         description
         // imageUrl
      );
      hotel.createHotel(res, userId);
   }
};

//! GET HOTEL
export const getHotel = (req, res) => {
   let { pageSize, pageNumber } = req.query;
   console.log(pageSize, pageNumber)
   // if (!pageSize) pageSize = 5;
   // if (!pageNumber) pageNumber = 1;
   const userId = req.id;
   const userRole = req.role;
   if (userRole == 1) {
      Hotel.getHotel(res, userId, pageSize, pageNumber);
   }
};

//!UPDATE HOTEL
export const updateHotel = (req, res) => {
   const { name, address, price, star, description } = req.body;
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
         description
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
   const { type, price, area } = req.body;

   if (userRole == 1) {
      const room = new Room(type, price, area);
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
   const { type, price, area } = req.body;
   const userRole = req.role;

   if (userRole == 1) {
      Room.updateRoom(res, hotelId, roomId, type, price, area);
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

//! CREATE IMAGE
export const createImage = (req, res) => {
   const { id } = req.params;
   const { imageType } = req.body; // 0: hotel image, 1: room image
   const image = req.file;
   const userRole = req.role;

   // console.log("Image Type : " + imageType)
   // console.log("Image : " + image.path);

   if (userRole == 1) {
      const imagePath = image.path;

      const roomImage = new Image(imagePath);
      roomImage.createImage(res, id, imageType);
   }
};

//! GET IMAGE
export const getImage = (req, res) => {
   const { id } = req.params;
   const { imageType } = req.query;
   console.log("Image : " + imageType);
   Image.getImage(res, id, imageType);
};

//! UPDATE IMAGE
export const updateImage = (req, res) => {
   const { id } = req.params;
   const { imageType } = req.query;
   const image = req.file;
   const imagePath = image.path;
   const hotelierId = req.id;
   const userRole = req.role;

   if (userRole == 1) {
      Image.updateImage(res, id, imageType, imagePath, hotelierId);
   }
};

//! DELETE IMAGE
export const deleteImage = (req, res) => {
   const { id } = req.params;
   const { imageType } = req.query; // 0: hotel image, 1: room image
   const userId = req.id;
   const userRole = req.role;

   if (userRole == 1) {
      Image.deleteImage(res, id, imageType, userId);
   }
};

//! CREATE SERVICE
export const addService = (req, res) => {
   const { serviceId } = req.body;
   const { hotelId } = req.params;
   const hotelierId = req.id;
   const userRole = req.role;

   if (userRole == 1) {
      Service.addService(res, serviceId, hotelId, hotelierId);
   }
};

//! GET SERVICE
export const getServiceByHotelier = (req, res) => {
   const { hotelId } = req.params;
   Service.getServiceByHotelier(res, hotelId);
};

//! DELETE SERVICE
export const deleteServiceByHotelier = (req, res) => {
   const { serviceId } = req.body;
   const { hotelId } = req.params;
   const hotelierId = req.id;
   const userRole = req.role;

   if (userRole == 1) {
      Service.deleteServiceByHotelier(res, serviceId, hotelId, hotelierId);
   }
};
