const { Product, Categorie } = require("../db");

const saveAllData = async (data) => {
  try {
    for (const beer of data) {
      const [newBeer, created] = await Product.findOrCreate({
        where: {
          name: beer.name,
        },
        defaults:{
          name: beer.name,
          description: beer.description,
          image: beer.image,
          country: beer.country,
          price: beer.price,
          alcoholContent: beer.alcoholContent,
          stock: beer.stock,
          amountMl: beer.amountMl
        }
      });
      if(created){
        console.log("Nuevo producto creado");
      } else {
        throw new Error("Producto ya existente en la Base de datos")
      }

      const categorie = await Categorie.findOne({
        where: {
          name: beer.categorie
        }
      });

      if (categorie) {
        await newBeer.addCategories(categorie); 
        console.log(`Producto relacionado con categoría: ${beer.categorie}`);
      } else {
        console.log(`Categoría no encontrada: ${beer.categorie}`);
      }

    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saveAllData,
};
