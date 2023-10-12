const { Categorie } = require("../db");

const saveCategoriesDB = async (data) => {
  try {
    for (const category of data) {
      const newCategory = await Categorie.findOrCreate({
        where: {
          name: category.name,
        },
        defaults: {
          name: category.name,
        },
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saveCategoriesDB,
};
