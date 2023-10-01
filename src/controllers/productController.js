const { Product, Categorie } = require("../db");
const { Op } = require('sequelize');

const createProd = async ({
  name,
  image,
  description,
  country,
  category,
  price,
  stock,
  amountMl,
  alcoholContent,
}) => {
  try {
    // Busca la categoría por nombre
    const categorie = await Categorie.findOne({
      where: {
        name: category
      }
    });

    if (!categorie) {
      throw new Error("Categoria no encontrada");
    } else {
      const [createNewProd, created] = await Product.findOrCreate({
        where: { name: name },
        defaults: {
          name,
          image,
          description,
          country,
          price,
          stock,
          amountMl,
          alcoholContent,
        },
      });
      await createNewProd.addCategorie(categorie);
      return createNewProd;
    }
  } catch(error) {
    return error;
  }
};

const searchProducts = async (query, country, order, page) => {
  const pageSize = 20; 
  const offset = (page - 1) * pageSize;
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'image'],
      where: filterConfiguration(query, country),
      order: orderingConfiguration(order),
      limit: pageSize,
      offset: offset
    });
    return { products: products, page: page };
  } catch(error) {
    return error;
  }
} 

const getProductById = async (id) => {
  try {
      const product = await Product.findByPk(id, { 
        include: {
          model: Categorie,  
          attributes: ["name"],
          through: { attributes: [] },
          as: 'Categories' 
        } 
      }); 
      return product;
    } catch(error) {
      return error;
    }
}

const filterConfiguration = (query, country) => {
  const filters = []
  if(query) {
    filters.push({ name: { [Op.iLike]: `%${query}%` } })
  }
  if(country) {
    filters.push({ country: { [Op.eq]: country } })
  }
  return {
    [Op.and]: filters
  };
}

const orderingConfiguration = (order) => {
  switch (order) {
    case "A_Z":
      return [["name", "ASC"]];
    case "Z_A":
      return [["name", "DESC"]];
    case "priceASC":
      return [["price", "ASC"]];
    case "priceDESC":
      return [["price", "DESC"]];
    case "alcoholASC":
      return [["alcoholContent", "ASC"]];
    case "alcoholDESC":
      return [["alcoholContent", "DESC"]];
    default:
      return []
  }
}

module.exports = {
  createProd,
  searchProducts,
  getProductById
};
