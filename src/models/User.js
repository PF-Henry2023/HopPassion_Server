const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    isUrl: true,
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ["admin", "user"],
                defaultValue: "user",
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            googleId: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        { timestamps: false}
    );

    //// Método para cifrar la contraseña antes de guardarla en la base de datos:
    User.beforeCreate(async (user) => {
        const saltRounds = 10;// Número de rondas de sal para el cifrado
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
    });

    // Método para comparar contraseñas al realizar la autenticación:
    User.prototype.comparePassword = async function (password) {
       return await bcrypt.compare(password, this.password);
    };
};