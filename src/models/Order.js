const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo

module.exports = (sequelize) => {
  sequelize.define("Order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["pending", "send", "delivered"],
      defaultValue: "pending",
    },

    total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

  });
};
