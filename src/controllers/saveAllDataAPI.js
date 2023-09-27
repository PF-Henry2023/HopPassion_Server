const { Product } = require("../db");

const saveAllData = async (data) => {
  try {
    for (const beer of data) {
      const newBeer = await Product.findOrCreate({
        where: {
          name: beer.name,
        },
        defaults:{
          name: beer.name,
          description: beer.description,
          image: beer.image,
          countrie: beer.country,
          price: beer.price,
          alcoholContent: beer.alcoholContent,
          stock: beer.stock,
          amountMl: beer.amountMl
        }
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saveAllData,
};
