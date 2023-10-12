const { Buy, User, Product } = require("../db");
const { sumArr } = require("../utils/generic_functions");

const getAllBuy = async () => {
  try {
    const allBuys = await Buy.findAll();
    return allBuys;
  } catch (error) {
    throw new Error(error);
  }
};

const getBuyId = async (userId) => {
  try {
    const buysId = await User.findByPk(userId, {
      include: Buy,
    });
    return buysId;
  } catch (error) {
    throw new Error(error);
  }
};

const createBuys = async (amount, payment_id, userId, productId) => {
  try {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    if (user && product) {
      const newBuy = await Buy.create({
        amount,
        payment_id,
      });
      await user.addBuy(newBuy);
      await product.addBuys(newBuy);
      console.log("Compra creada y relacionada con usuario y producto");
    } else {
      throw new Error("Usuario o producto no encontrado");
    }
    return "Compra guardada en la DB";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const amounTotal = async () => {
  try {
    const amounts = await Buy.findAll({
      attributes: ["amount"], 
    });
    const total = sumArr(amounts);
    return total;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  getAllBuy,
  getBuyId,
  createBuys,
  amounTotal,
};
