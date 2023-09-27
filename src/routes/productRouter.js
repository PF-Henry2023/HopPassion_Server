const { Router } = require("express");
const { createProduct, allProducts, product } = require("../handlers/productHandler");
const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/all", allProducts);
productRouter.get("/id:", product)

module.exports = productRouter;