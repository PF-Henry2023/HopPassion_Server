const { User } = require("../db");

const createUser = async (name, lastName, address, email, phone, role, password) => {

    const newUser = await User.create({name, lastName, address, email, phone, role, password});

    return newUser;
};

const getUserById = async (id) => {
    const userById = await User.findOne({ where: { id }})
    if (!userById) throw Error("User not found");
    return userById;
}
const updateUser = async ( id, name, lastName, address, email, phone, role, password ) => {
    const user = getUserById(id);

    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.role = role || user.role;
    user.password = password || user.password;

    return user;
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

const getAllUsers = async () => {
    const users = await User.findAll();
    if(users.length === 0) throw Error("¡No hay usuarios en la base de datos!");

    return users;
}

module.exports = {
    createUser,
    updateUser,
    signIn,
    getAllUsers,
    getUserById,

}