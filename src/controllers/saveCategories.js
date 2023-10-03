const { Categorie } = require("../db");

const saveCategoriesDB = async (data) => {
  try {
    console.log(data);
    for (const categoryObj of data) {
      const categoryName = categoryObj.name;

      await Categorie.findOrCreate({
        where: {
          name: categoryName,
        },
        defaults: {
          name: categoryName,
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
