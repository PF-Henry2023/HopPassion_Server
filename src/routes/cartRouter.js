const { Router } = require("express");
const { getCartHandler, addProductHandler } = require("../handlers/cartHandler");
const { verifyToken } = require ("../utils/authJwt");
const cartRouter = Router();

cartRouter.get("/", verifyToken, getCartHandler);
cartRouter.post("/add", verifyToken, addProductHandler);

module.exports = cartRouter;

