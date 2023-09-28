const { Router } = require("express");
const { saveAllInfo } = require("../handlers/saveAllHandler");
const saveAllRoute = Router();

saveAllRoute.post("/", saveAllInfo);

module.exports = saveAllRoute