const { Router } = require("express");
const { createProduct, allProducts, getProduct } = require("../handlers/productHandler");
const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/all", allProducts);
productRouter.get("/:id", getProduct)

module.exports = productRouter;