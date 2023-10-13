const { User, Buy } = require("../db");
const { userActiveDesactive, monthlyIncomeForTheYear } = require("../utils/generic_functions");

const totalUsersStadistics = async () => {
  try {
    const total = await User.findAll();
    const response = userActiveDesactive(total);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const monthlyIncome = async (type, actualYear) => {
  try {
    const allBuys = await Buy.findAll();
    const amountForYear = monthlyIncomeForTheYear(allBuys, type, actualYear);
    return amountForYear;
  } catch (error) {
    console.log(error);
    throw new Error(error)    
  }
}

module.exports = {
  totalUsersStadistics,
  monthlyIncome,
}