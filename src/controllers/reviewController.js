const createRev = async () => {
  try {
    return "createRev";
  } catch (error) {
    throw new Error(`Error creating Review :${error.message}`);
  }
};

module.exports = {
  createRev,
};
