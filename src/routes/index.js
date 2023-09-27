const { Router } = require("express");
const router = Router();

const reviewRouter = require("./reviewRouter");

router.use("/review", reviewRouter);

module.exports = router;
