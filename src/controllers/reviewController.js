const { Review, Product } = require("../db");

const createRev = async (review) => {
  try {
    const { idProd, ...reviewData } = review;
    const newReview = await Review.create(reviewData);

    if (idProd) {
      const product = await Product.findByPk(idProd);
      if (product) {
        await newReview.setProduct(product);
      } else {
        throw new Error(`Producto con id ${idProd} no encontrado.`);
      }
    }

    return newReview;
  } catch (error) {
    throw new Error(`Error creating Review: ${error.message}`);
  }
};

const deleteRev = async (idReview) => {
  try {
    const deletedReview = await Review.destroy({
      where: {
        id: idReview,
      },
    });

    if (deletedReview === 0) {
      throw new Error(`No se encontró ninguna revisión con ID ${idReview}.`);
    }

    return deletedReview;
  } catch (error) {
    throw new Error(`Error deleting Review: ${error.message}`);
  }
};

const updateRev = async (idReview, changes) => {
  try {
    const [updatedCount, updatedReviews] = await Review.update(changes, {
      where: {
        id: idReview,
      },
      returning: true, // Esto devuelve las filas actualizadas
    });

    //updatedCount son las cant de cambios;

    if (updatedCount === 0) {
      throw new Error(`No se encontró ninguna revisión con ID ${idReview}.`);
    }

    return updatedReviews[0]; // Devuelve la revisión actualizada
  } catch (error) {
    throw new Error(`Error updating Review: ${error.message}`);
  }
};

const listRev = async (idProd) => {
  try {
    const reviews = await Review.findAll();
    return reviews;
  } catch (error) {
    throw new Error(`Error retrieving Review: ${error.message}`);
  }
};

module.exports = {
  createRev,
  deleteRev,
  updateRev,
  listRev,
};
