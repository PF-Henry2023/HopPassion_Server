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
                    attributes: [ 'name', 'image', 'stock', 'id' ]
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
        if(quantity < 1) {
            throw new Error("Invalid quantity")
        } 
        const product = await Product.findByPk(productId)
        if(product == null) {
            throw new Error("Product not found")
        }
        if(product.stock < quantity) {
            throw new Error("Not enough stock")
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
            if(product.stock < (entry.quantity + quantity)) {
                throw new Error("Not enough stock")
            } 
            entry.quantity += quantity
            await entry.save()
        }
        return true;
    } catch(error) {
        throw new Error(error.message);
    }
}

const removeProduct = (userId, productId, quantity) => {

}

const deleteProduct = async (userId, productId) => {
    try {
        const cart = await Order.findOne({
            attributes: ['id'],
            where: {
                user_id: userId,
                status: "pending"
            }
        })
        if(cart == null) {
            throw new Error("There is no cart")
        }
        const entry = await OrderDetail.findOne({
            attributes: ['id'],
            where: {
                order_id: cart.id,
                product_id: productId
            }
        })
        if(entry == null) {
            throw new Error("There is no entry")
        }
        await entry.destroy()
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
                stock: row.Product.stock,
                id: row.Product.id
            }
        }),
        total: order.OrderDetails.reduce((accumulator, row) => {
            return accumulator + row.unitPrice * row.quantity
        }, 0).toFixed(2).toString()

    }
}

module.exports = {
    getCart,
    addProduct,
    removeProduct,
    deleteProduct
  }