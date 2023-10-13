const { Router } = require("express");
const {
  getTotalUsers,
  getMonthlyIncomeForTheYear,
  getTenProducts
} = require("../handlers/stadisticsHandler");
const stadisticsRouter = Router();

stadisticsRouter.get("/totalUsers", getTotalUsers);
stadisticsRouter.get("/monthlyIncomeForTheYear", getMonthlyIncomeForTheYear);
stadisticsRouter.get("/getTenProduct",getTenProducts );

module.exports = stadisticsRouter;
