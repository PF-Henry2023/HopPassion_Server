const { User } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PASSWORD_JWT } = process.env;

const createUser = async ({name, lastName, address, email, phone, role, password}) => {

    const [user, created] = await User.findOrCreate({
        where: { email },
        defaults:{
            name, 
            lastName, 
            address, 
            email, 
            phone, 
            role, 
            password
        }});
        if(!created) throw Error("User already exists");
        const token = jwt.sign({id: user.id}, PASSWORD_JWT, { expiresIn: 86400} );
    return token;
};

const getUserById = async (id) => {
    const userById = await User.findOne({
        where: {
            id: id,
        }
    })
    if (!userById) throw Error("User not found");
    return userById;
}

const updateUser = async ( id, dataUser ) => {
    const allowedFields = ["name","lastName","address","email","phone","password"]; //contiene los nombres de los campos que se pueden actualizar
    const updateFields = Object.keys(dataUser); //Se obtienen los nombres de los campos que se desean actualizar
    const invalidFields = updateFields.filter((field) => !allowedFields.includes(field)); //validación para asegurarse de que los campos que se desean actualizar estén incluidos en la lista de campos permitidos
    if(invalidFields.length > 0) throw Error("Invalid Fields");

    await User.update(dataUser, {where: {id}});

    return {
        status: `User '${dataUser.name}' updated successfully`,
    };
}

const signIn = async (email, password) => {
    const userFound = await User.findOne({where: {email: email}})
    if(!userFound) throw Error ("User not found");
    const matchPassword = await userFound.comparePassword(password)
    if(!matchPassword) throw Error("Invalid password");
    console.log(userFound);
    const token = jwt.sign({id: userFound.id}, PASSWORD_JWT, { expiresIn: 86400} );

    return token;
};
 
module.exports = {
    createUser,
    updateUser,
    signIn,
}