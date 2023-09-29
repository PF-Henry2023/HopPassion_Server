const { getCountryOrig, orderingProducts } = require("../controllers/filtersControllers"); 

const getCountryOrigin = async (req, res) => {
  try {
    const { country } = req.query;
    if(!country){
      throw new Error("No se paso ningun pais");
    } else {
      const filterCountries = await getCountryOrig(country);
      res.status(200).json(filterCountries);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderingProducts = async (req, res) => {
  try {
    const { info } = req.params;
    const ordering = await orderingProducts(info);
    res.status(200).json(ordering);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getCountryOrigin,
  getOrderingProducts,
};
