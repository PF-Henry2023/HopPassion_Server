const { Router } = require("express");  
const { getCountryOrigin, getOrderingProducts } = require("../handlers/filtersHandler");
const filterRoute = Router();

filterRoute.get("/countryOrigin", getCountryOrigin);
filterRoute.get("/orderingProducts/:info", getOrderingProducts);

module.exports = filterRoute;