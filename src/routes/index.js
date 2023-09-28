const { Router } = require("express");
const router = Router();
const saveAllRoute = require("./saveAllInfoAPI");

const reviewRouter = require("./reviewRouter");
const productRouter = require("./productRouter");

router.use("/dataUpload", saveAllRoute);
router.use("/review", reviewRouter);
router.use("/product", productRouter);


module.exports = router;
