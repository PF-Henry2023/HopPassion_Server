const { Router } = require("express");
const {
  createReview,
  deleteReview,
  updateReview,
  listReview,
} = require("../handlers/reviewHandler.js");
const reviewRouter = Router();

reviewRouter.post("/create", createReview);
reviewRouter.post("/delete", deleteReview);
reviewRouter.post("/update", updateReview);
reviewRouter.post("/list", listReview);

module.exports = reviewRouter;
