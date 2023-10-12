const { Router } = require("express");
const { createProduct, allProducts, getProduct,deleteProduct,activeProduct,editProduct } = require("../handlers/productHandler");
const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/all", allProducts);
productRouter.get("/:id", getProduct)
productRouter.delete("/:id", deleteProduct)
productRouter.post("/:id", activeProduct)
productRouter.put("/:id", editProduct)


module.exports = productRouter;