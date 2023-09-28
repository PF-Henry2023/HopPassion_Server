const { Router } = require("express");  
const { getCategorie } = require("../handlers/filtersHandler");
const filterRoute = Router();

filterRoute.get("/categories", getCategorie);

module.exports = filterRoute;