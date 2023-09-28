const { Product } = require("../db");

const createProd = async ({
  name,
  image,
  description,
  country,
  price,
  stock,
  amountMl,
  alcoholContent,
}) => {
  const createNewProd = await Product.create({
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
  console.log(createNewProd);
  return createNewProd;
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
  createProd,
  allProdu,
  searchByName,
};
