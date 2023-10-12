const { Router } = require("express");
const { getCartHandler, addProductHandler, removeProductHandler, deleteProductHandler, setProductHandler, getAllOrderDetail } = require("../handlers/cartHandler");
const { verifyToken } = require ("../utils/authJwt");
const cartRouter = Router();

cartRouter.get("/", verifyToken, getCartHandler);
cartRouter.post("/add", verifyToken, addProductHandler);
cartRouter.post("/remove", verifyToken, removeProductHandler);
cartRouter.post("/delete", verifyToken, deleteProductHandler);
cartRouter.put("/set", verifyToken, setProductHandler);
cartRouter.get("/getAllOrderDetails", /* verifyToken, */ getAllOrderDetail);

module.exports = cartRouter;

