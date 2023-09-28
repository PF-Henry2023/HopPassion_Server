const {
  createProd,
  allProdu,
  searchByName,
} = require("../controllers/productController");
const { Product } = require("../db");

const createProduct = async (req, res) => {
  /*  try {
    const response = await createProd();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } */
  res.send("esta ruta es para crear producto");
};
const allProducts = async (req, res) => {
  try {
    const { name } = req.query;
    const response = name ? await searchByName(name) : await allProdu();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const product = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Product.findByPk(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProduct, allProducts, product };
