const { Product } = require("../db");

const getCountryOrig = async (country) => {
  try {
    const allProducts = await Product.findAll();
    if(!allProducts){
      throw new Error("No hay productos en la base de datos");
    } else {
      const filterProducts = allProducts.filter(e => e.country === country);
      if(!filterProducts){
        throw new Error("No se encontraron productos con ese pais de origen")
      } else {
        return filterProducts;
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

const orderingProducts = async (info) => {
  try {
    let orderedProducts;
    switch (info) {
      case "A_Z":
        orderedProducts = await Product.findAll({
          order: [["name", "ASC"]]
        });
        break;
      case "Z_A":
        orderedProducts = await Product.findAll({
          order: [["name", "DESC"]]
        });
        break;
      case "priceASC":
        orderedProducts = await Product.findAll({
          order: [["price", "ASC"]]
        })
        break;
      case "priceDESC":
        orderedProducts = await Product.findAll({
          order: [["price", "DESC"]]
        })
      default:
        break;
    }
    return orderedProducts;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getCountryOrig,
  orderingProducts,
}