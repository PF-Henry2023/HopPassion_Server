const { Router } = require("express");
const { mercadoPagoPayment } = require("../handlers/mercadoPagoHandler");

const mercadoPagoRoute = Router();

mercadoPagoRoute.post("/process_payment", mercadoPagoPayment)

module.exports = mercadoPagoRoute