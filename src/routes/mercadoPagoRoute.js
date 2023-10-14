const { Router } = require("express");
const { mercadoPagoPayment } = require("../handlers/mercadoPagoHandler");
const { verifyToken } = require("../utils/authJwt");
const mercadoPagoRoute = Router();

mercadoPagoRoute.post("/process_payment", verifyToken, mercadoPagoPayment);

module.exports = mercadoPagoRoute;
