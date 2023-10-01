const {
  createProd,
  searchProducts,
  getProductById
} = require("../controllers/productController");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      category,
      country,
      price,
      stock,
      amountMl,
      alcoholContent,
    } = req.body;
    const response = await createProd({name,
      image,
      description,
      country,
      price,
      stock,
      category,
      amountMl,
      alcoholContent,});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const allProducts = async (req, res) => {
  try {
    const { query, country, order, page } = req.query;
    const response = await searchProducts(query, country, order, parseInt(page ?? 1, 10))
    return res.status(200).json(response);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id)
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProduct, allProducts, getProduct };
