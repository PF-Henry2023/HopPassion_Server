const { Router } = require("express");
const { createReview } = require("../handlers/reviewHandler.js");
const reviewRouter = Router();

reviewRouter.post("/create", createReview);

module.exports = reviewRouter;
