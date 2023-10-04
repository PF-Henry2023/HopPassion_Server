const { Order } = require("../db")

const getCart = async (userId) => { //devuelve carrito del user 
    try {
        const cart = await Order.findOne({
            where: {
                user_id: userId,
                status: "pending"
            },
        })
        return cart;
    } catch(error) {
        return error;
    }
}

const addProduct = async () => {
    
}

module.exports = {
    getCart,
    addProduct
  }