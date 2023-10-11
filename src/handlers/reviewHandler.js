const {
  createRev,
  deleteRev,
  updateRev,
  listRev,
} = require("../controllers/reviewController.js");

const createReview = async (req, res) => {
  try {
    const review = req.body;
    const response = await createRev(review);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    const { idReview } = req.body;
    const response = await deleteRev(idReview);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateReview = async (req, res) => {
  try {
    const { idProd, ...changes } = req.body;
    const response = await updateRev(idProd, changes);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const listReview = async (req, res) => {
  try {
    const { idProd } = req.query;
    const response = await listRev(idProd);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createReview, deleteReview, updateReview, listReview };
