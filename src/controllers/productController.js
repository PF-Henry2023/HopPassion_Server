const createRev = async () => {
    try {
      return "createProduct";
    } catch (error) {
      throw new Error(`Error creating Product:${error.message}`);
    }
  };
  

  
  module.exports = {
    createRev,
  };
  