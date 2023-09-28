const { Router } = require("express");
const router = Router();

const saveAllRoute = require("./saveAllInfoAPI");
const reviewRouter = require("./reviewRouter");
const productRouter = require("./productRouter");
const usersRouter = require("./usersRouter");
const filterRoute = require("./filtersRoute.js");

router.use("/dataUpload", saveAllRoute);
router.use("/review", reviewRouter);
router.use("/users", usersRouter);
router.use("/filters", filterRoute);
router.use("/product", productRouter);


module.exports = router;
