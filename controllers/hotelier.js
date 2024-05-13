import { Hotel } from "../models/hotel.js";

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

export const deleteHotel = (req, res) => {
  const user_id = req.id;
  const { hotel_id } = req.params;

  Hotel.deleteHotel(res, user_id, hotel_id);
};
