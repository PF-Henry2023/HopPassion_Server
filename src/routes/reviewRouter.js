const { Router } = require("express");
const {
  createReview,
  deleteReview,
  updateReview,
  listReview,
} = require("../handlers/reviewHandler.js");
const reviewRouter = Router();

reviewRouter.post("/create", createReview);
reviewRouter.delete("/delete/:idReview", deleteReview);
reviewRouter.put("/update", updateReview);
reviewRouter.get("/list", listReview);

module.exports = reviewRouter;
