import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

export const signupAsCustomer = (req, res) => {
   const { name, dob, email, gender, phone_number, password } = req.body;
   const hashPassword = bcrypt.hashSync(password);

   const user = new User(name, dob, email, gender, phone_number, 0);
   user.signUp(hashPassword, res);
};

export const signupAsHotelier = (req, res) => {
   const { name, dob, email, gender, phone_number, password } = req.body;
   const hashPassword = bcrypt.hashSync(password);

   const user = new User(name, dob, email, gender, phone_number, 1);
   user.signUp(hashPassword, res);
};

export const signin = (req, res) => {
   const { phone_number, password } = req.body;

   const user = new User(null, null, null, null, phone_number, null);

   user.signIn(password, res);
};
