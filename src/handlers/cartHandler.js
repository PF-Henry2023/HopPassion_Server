const { getCart } = require("../controllers/cartController");

const getCartHandler = async (req, res) => {
    try {
        const response = await getCart(req.userId)
        if(response) {
            res.status(200).json(response);
        }
        res.status(204).send();
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
};

const addProductHandler = async (req, res) => {
    
}

module.exports = {
    getCartHandler,
    addProductHandler
  }