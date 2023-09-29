const { createRev } = require("../controllers/reviewController.js");

const createReview = async (req, res) => {
  try {
    const response = await createRev();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createReview };
