const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo

module.exports = (sequelize) => {
  sequelize.define(
    "Categorie",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    { timestamps: false }
  );
};
