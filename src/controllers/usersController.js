const { User } = require("../db");

const createUser = async (name, lastName, address, email, phone, role, password) => {

    const newUser = await User.create({name, lastName, address, email, phone, role, password});

    return newUser;
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
 
module.exports = {
    createUser,
    updateUser,
}