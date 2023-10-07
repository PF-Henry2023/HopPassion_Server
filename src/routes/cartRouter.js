const { Router } = require("express");
const { getCartHandler, addProductHandler, removeProductHandler, deleteProductHandler, setProductHandler } = require("../handlers/cartHandler");
const { verifyToken } = require ("../utils/authJwt");
const cartRouter = Router();

cartRouter.get("/", verifyToken, getCartHandler);
cartRouter.post("/add", verifyToken, addProductHandler);
cartRouter.post("/remove", verifyToken, removeProductHandler);
cartRouter.post("/delete", verifyToken, deleteProductHandler);
cartRouter.put("/set", verifyToken, setProductHandler);

module.exports = cartRouter;

