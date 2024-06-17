import database from "../utils/database.js";
import { Pagination } from "./pagination.js";

export class Feedback {
  constructor(review, rating) {
    this.review = review;
    this.rating = rating;
  }

  //! CREATE FEEDBACK
  createFeedback(res, hotelId, customerId) {
    database
      .insert({
        hotel_id: hotelId,
        customer_id: customerId,
        review: this.review,
        rating: this.rating,
      })
      .into("feedback")
      .returning("*")
      .then((feedback) => {
        res.json(feedback);
      })
      .catch((err) => {
        res.json("Error");
        console.log(err);
      });
  }

  //! GET FEEDBACK
  static getFeedback(res, hotelId, pageSize, pageNumber) {
    database("feedback")
      .where("hotel_id", "=", hotelId)
      .select("*")
      .then((allFeedbacks) => {
        const startIndex = (+pageNumber - 1) * +pageSize;
        const endIndex = startIndex + +pageSize;
        const feedbacks = allFeedbacks.slice(startIndex, endIndex);
        const pageTotal = Math.ceil(allFeedbacks.length / +pageSize);
        res
          .status(200)
          .json(new Pagination(pageSize, pageNumber, pageTotal, feedbacks));
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }

  //! DELETE FEEDBACK
  static deleteFeedback(res, feedbackId, customerId) {
    database("feedback")
      .where("id", "=", feedbackId)
      .andWhere("customer_id", "=", customerId)
      .del()
      .then((data) => {
        res.json("Deleted");
      })
      .catch((err) => {
        console.log(err);
        res.json("Error");
      });
  }
}
