import { User } from "../models/user.js";

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
