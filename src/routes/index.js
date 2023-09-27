const { Router } = require("express");
const router = Router();

const reviewRouter = require("./reviewRouter");
const productRouter = require("./productRouter");

router.use("/review", reviewRouter);
router.use("/product", productRouter);


module.exports = router;
