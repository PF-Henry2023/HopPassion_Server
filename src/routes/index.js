const { Router } = require("express");
const router = Router();

const reviewRouter = require("./reviewRouter");

const usersRouter = require("./usersRouter");
const filterRoute = require("./filtersRoute.js");
const saveAllRoute = require("./saveAllInfoAPI");

router.use("/dataUpload", saveAllRoute);
router.use("/review", reviewRouter);
router.use("/users", usersRouter);
router.use("/filters", filterRoute);

module.exports = router;
