const { Router } = require("express");
const { getCartHandler, addProductHandler, removeProductHandler, deleteProductHandler } = require("../handlers/cartHandler");
const { verifyToken } = require ("../utils/authJwt");
const cartRouter = Router();

cartRouter.get("/", verifyToken, getCartHandler);
cartRouter.post("/add", verifyToken, addProductHandler);
cartRouter.post("/remove", verifyToken, removeProductHandler);
cartRouter.post("/delete", verifyToken, deleteProductHandler);

module.exports = cartRouter;

