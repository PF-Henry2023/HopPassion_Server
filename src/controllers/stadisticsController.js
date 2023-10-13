const { User, Buy, Product,Categorie } = require("../db");
const { userActiveDesactive, monthlyIncomeForTheYear } = require("../utils/generic_functions");

const totalUsersStadistics = async () => {
  try {
    const total = await User.findAll();
    const response = userActiveDesactive(total);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const monthlyIncome = async (type, actualYear) => {
  try {
    const allBuys = await Buy.findAll();
    const amountForYear = monthlyIncomeForTheYear(allBuys, type, actualYear);
    return amountForYear;
  } catch (error) {
    console.log(error);
    throw new Error(error)    
  }
}
const getTen= async()=>{
  try {
    const productosConComprasYCategorias = await Product.findAll({
      include: [
        {
          model: Buy, // Incluye las compras
        },
        {
          model: Categorie, // Incluye las categorías
          as:"Categories"
        },
      ],
    });

    // Mapea los productos y cuenta la cantidad de compras
    const productosConConteoCompras = productosConComprasYCategorias.map((producto) => ({
      id: producto.id,
      name: producto.name, // Ajusta esto a la propiedad adecuada en tu modelo de Product
      totalAmount: producto.Buys.length, // Obtén la cantidad de compras
      categories:producto.Categories
    }));
    console.log(productosConComprasYCategorias);

    // Ordena los productos por la cantidad de compras en orden descendente
    productosConConteoCompras.sort((a, b) => b.totalAmount - a.totalAmount);

    // Obtiene los 10 productos principales
    const productosTop10 = productosConConteoCompras.slice(0, 10);

    return productosTop10;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

module.exports = {
  totalUsersStadistics,
  monthlyIncome,
  getTen
}