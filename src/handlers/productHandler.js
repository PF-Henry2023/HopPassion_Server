const { createProd } = require("../controllers/productController");

const createProduct = async (req, res) => {
 /*  try {
    const response = await createProd();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } */ 
  res.send("esta ruta es para crear producto")
};
const allProducts = async (req, res) => {
    /*  try {
       const response = await createProd();
       res.status(200).json(response);
     } catch (error) {
       res.status(400).json({ error: error.message });
     } */ 
     res.send("esta ruta es para traer todos los productos")
   };
   const product = async (req, res) => {
    /*  try {
       const response = await createProd();
       res.status(200).json(response);
     } catch (error) {
       res.status(400).json({ error: error.message });
     } */ 
     res.send("esta ruta es para buscar id de producto")
   };


module.exports = { createProduct, allProducts, product};
