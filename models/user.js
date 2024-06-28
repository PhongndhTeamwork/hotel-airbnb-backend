import database from "../utils/database.js";
import { Pagination } from "./pagination.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class User {
  constructor(name, dob, email, gender, phone_number, role) {
    this.dob = dob;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.phone_number = phone_number;
    this.role = role;
  }

  signUp(hashPassword, res) {
    database
      .transaction((trx) => {
        trx
          .insert({
            password: hashPassword,
            phone_number: this.phone_number,
          })
          .into("login")
          .returning("phone_number")
          .then((loginPhoneNumber) => {
            return trx("users")
              .returning("*")
              .insert({
                phone_number: loginPhoneNumber[0].phone_number,
                name: this.name,
                dob: this.dob,
                email: this.email,
                role: this.role,
                register_datetime: new Date(),
              })
              .then((user) => {
                res.json(user[0]);
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code == "23505") {
          return res.status(400).json("phone number is duplicated");
        }
        res.status(400).json("unable to register");
      });
  }

  signIn(password, res) {
    database
      .select("phone_number", "password")
      .from("login")
      .where("phone_number", "=", this.phone_number)
      .then((data) => {
        if (data.length == 0) {
          return res.status(400).json("wrong credentials");
        }
        const isValid = bcrypt.compareSync(password, data[0].password);
        if (isValid) {
          return database
            .select("*")
            .from("users")
            .where("phone_number", "=", this.phone_number)
            .then((user) => {
              const token = jwt.sign(user[0], process.env.JWT_KEY, {
                expiresIn: "1d",
              });
              res.status(200).json({ token: token, ...user[0] });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json("unable to get user");
            });
        } else {
          res.status(400).json("wrong credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("wrong credentials");
      });
  }

  //! GET PROFILE
  static getProfile(res, userId) {
    database("users")
      .where("id", "=", userId)
      .select("*")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }

  //! UPDATE PROFILE
  static updateProfile(res, userId, name, dob, email, gender, phoneNumber) {
    database("users")
      .where("id", "=", userId)
      .update({
        name: name,
        dob: dob,
        email: email,
        gender: gender,
        phone_number: phoneNumber,
      })
      .returning("*")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  }

  //! GET USERS FOR ADMIN
  static getUser(res, pageSize, pageNumber) {
    database("users")
      .where("role", "!=", 2)
      .orderBy("role")
      .select("*")
      .then((allUsers) => {
        const startIndex = (+pageNumber - 1) * +pageSize;
        const endIndex = startIndex + +pageSize;
        const users = allUsers.slice(startIndex, endIndex);
        const pageTotal = Math.ceil(allUsers.length / +pageSize);
        res
          .status(200)
          .json(new Pagination(+pageSize, +pageNumber, pageTotal, users));
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }
}
