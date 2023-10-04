const { Order, OrderDetail, Product } = require("../db")

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
        throw new Error(error.message);
    }
}

const addProduct = async ( userId, productId, quantity ) => {
    
    try {
        const product = await Product.findByPk(productId)
        if(product == null) {
            throw new Error("Product not found")
        }
        const [ cart, cartCreated ] = await Order.findOrCreate({
            where: {
                user_id: userId,
                status: "pending"
            },
            defaults: { 
                date: new Date()
            }
        })
        const [ entry, entryCreated ] = await OrderDetail.findOrCreate({
            where: {
                order_id: cart.id,
                product_id: product.id
            },
            defaults: {
                order_id: cart.id,
                product_id: product.id,
                quantity: quantity,
                unitPrice: product.price
            }
        })
        if(!entryCreated) {
            entry.quantity += quantity
            await entry.save()
        }
        return true;
    } catch(error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getCart,
    addProduct
  }