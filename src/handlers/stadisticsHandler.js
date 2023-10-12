const {
  totalUsersStadistics,
  monthlyIncome,
} = require("../controllers/stadisticsController");

const getTotalUsers = async (req, res) => {
  try {
    const response = await totalUsersStadistics();
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMonthlyIncomeForTheYear = async (req, res) => {
  try {
    const { type } = req.query;
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();
    const response = await monthlyIncome(type, actualYear);
    res.status(200).json({ data: response, actualYear: actualYear });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTotalUsers,
  getMonthlyIncomeForTheYear,
};
