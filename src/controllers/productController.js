const { Product, Categorie } = require("../db");

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
    console.log("Producto relacionado con exito");
    return createNewProd;

  }
};

const allProdu = async () => {
  const getAll = await Product.findAll({
    include: {
      model: Categorie,
      attributes: ["name"],
      through: { attributes: [] },
      as: 'Categories' 
    }
  });
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
  console.log(productList);
  return filterByName;
};
module.exports = {
  createProd,
  allProdu,
  searchByName,
};
