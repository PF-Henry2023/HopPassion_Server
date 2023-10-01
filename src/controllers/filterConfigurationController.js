const { Categorie, Product } = require("../db");

const getConfiguration = async () => {
    try {
        const categories = await Categorie.findAll({
            attributes: ['name'],
            order: [['name', 'ASC']], 
        });

        const products = await Product.findAll({
            attributes: ['country'],
        });
        const countries = new Set();
        products.map((product) => countries.add(product.country))
        return {
            countries: Array.from(countries).sort((a, b) => a.localeCompare(b)), 
            categories: categories.map((category) => category.name), 
            order: [
                { id: "A_Z", name: "Nombre ASC" },
                { id: "Z_A", name: "Nombre DESC" },
                { id: "priceASC", name: "Menor Precio" },
                { id: "priceDESC", name: "Mayor Precio" },
                { id: "alcoholASC", name: "Menor Graduación" },
                { id: "alcoholDESC", name: "Mayor Graduación" },
            ]
        }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  module.exports = {
    getConfiguration
  }