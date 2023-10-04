const { Router } = require("express");
const router = Router();

const saveAllRoute = require("./saveAllInfoAPI");
const reviewRouter = require("./reviewRouter");
const productRouter = require("./productRouter");
const usersRouter = require("./usersRouter");
const categoriesSave = require("./saveCategoriesRoute");
const categoriesRoutes = require("./categoriesRoute");
const filterConfigurationRoutes = require("./filterConfigurationRouter")
const cartRouter = require("./cartRouter")

router.use("/dataUpload", saveAllRoute);
router.use("/review", reviewRouter); 
router.use("/users", usersRouter);
router.use("/saveCategories", categoriesSave);
router.use("/product", productRouter);
router.use("/categories", categoriesRoutes);
router.use("/filters", filterConfigurationRoutes)
router.use("/cart", cartRouter)

module.exports = router;
