const { Categorie } = require("../db");

const createNewCategorie = async ({ name, description }) => {
  try {
    const [newCategory, created] = await Categorie.findOrCreate({
      where: {
        category: name,
      },
      defaults: {
        category: name,
        description,
      },
    });
    if (created) {
      return newCategory;
    } else {
      throw new Error("La categoria ya existente en la base de datos");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCategories = async () => {
  try {
    const categories = await Categorie.findAll();
    if (!categories) {
      throw new Error("No se encontro ninguna categorias en la base de datos");
    } else {
      return categories;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const findCategorie = async (data) => {
  try {
    const category_p = await Categorie.findOne({
      where: {
        category: data,
      },
      include: "Products",
    });
    if (!category_p) {
      throw new Error("No se encontro la categoria");
    } else {
      return category_p;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getCategories,
  findCategorie,
  createNewCategorie,
};
