import database from "../utils/database.js";
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
        console.log(err);
        res.status(400).json("unable to register");
      });
  }

  signIn(password, res) {
    database
      .select("phone_number", "password")
      .from("login")
      .where("phone_number", "=", this.phone_number)
      .then((data) => {
        const isValid = bcrypt.compareSync(password, data[0].password);
        if (isValid) {
          return database
            .select("*")
            .from("users")
            .where("phone_number", "=", this.phone_number)
            .then((user) => {
              const token = jwt.sign(user[0], process.env.JWT_KEY, {
                expiresIn: "2d",
              });
              res.json({ token: token, ...user[0] });
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
}
