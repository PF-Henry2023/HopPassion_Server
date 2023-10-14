const { Router } = require("express");
const {
  getTotalUsers,
  getMonthlyIncomeForTheYear,
  historicalTotal,
} = require("../handlers/stadisticsHandler");
const stadisticsRouter = Router();

stadisticsRouter.get("/totalUsers", getTotalUsers);
stadisticsRouter.get("/monthlyIncomeForTheYear", getMonthlyIncomeForTheYear);
stadisticsRouter.get("/historixalTotalSales", historicalTotal);

module.exports = stadisticsRouter;
