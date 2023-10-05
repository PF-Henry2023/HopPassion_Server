const { Order, OrderDetail, Product } = require("../db")

const getCart = async (userId) => { //devuelve carrito del user 
    try {
        const cart = await Order.findOne({
            attributes: ['id'],
            where: {
                user_id: userId,
                status: "pending"
            },
            include: [{
                model: OrderDetail,
                as: 'OrderDetails',
                attributes: [ 'quantity', 'unitPrice' ],
                include: [{
                    model: Product,
                    attributes: [ 'name', 'image', 'stock' ]
                }]
            }]
        })
        return mapOrderToCart(cart.toJSON())
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

const mapOrderToCart = (order) => {
    return {
        id: order.id,
        products: order.OrderDetails.map((row) => {
            return {
                quantity: row.quantity,
                price: row.unitPrice.toString(),
                name: row.Product.name,
                image: row.Product.image,
                stock: row.Product.stock
            }
        }),
        total: order.OrderDetails.reduce((accumulator, row) => accumulator + row.unitPrice, 0).toFixed(2).toString()
    }
}

module.exports = {
    getCart,
    addProduct,
  }