const { Router } = require("express");
const router = Router();

const reviewRouter = require("./reviewRouter");
const usersRouter = require("./usersRouter");

router.use("/review", reviewRouter);
router.use("/users", usersRouter);

module.exports = router;
