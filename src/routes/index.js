const { Router } = require("express");
const router = Router();

const reviewRouter = require("./reviewRouter");
const filterRoute = require("./filtersRoute.js");
const saveAllRoute = require("./saveAllInfoAPI");
const categoriesSave = require("./saveCategoriesRoute");

router.use("/dataUpload", saveAllRoute);
router.use("/review", reviewRouter); 
router.use("/filters", filterRoute);
router.use("/saveCategories", categoriesSave);

module.exports = router;
