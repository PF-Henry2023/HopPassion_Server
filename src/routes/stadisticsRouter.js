const { Router } = require("express");
const {
  getTotalUsers,
  getMonthlyIncomeForTheYear,
} = require("../handlers/stadisticsHandler");
const stadisticsRouter = Router();

stadisticsRouter.get("/totalUsers", getTotalUsers);
stadisticsRouter.get("/monthlyIncomeForTheYear", getMonthlyIncomeForTheYear);

module.exports = stadisticsRouter;
