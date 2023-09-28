const { Product } = require("../db");

const createRev = async () => {
  try {
    return "createProduct";
  } catch (error) {
    throw new Error(`Error creating Product:${error.message}`);
  }
};

const allProdu = async () => {
  const getAll = await Product.findAll();
  return getAll;
};

const searchByName = async (name) => {
  const productList = await allProdu();
  const filterByName = productList.filter((element) => {
    return (
      element &&
      element.name &&
      element.name.toLowerCase().includes(name.toLowerCase())
    );
  });
  return filterByName;
};
module.exports = {
  createRev,
  allProdu,
  searchByName,
};
