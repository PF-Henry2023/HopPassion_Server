const { createUser, updateUser } = require("../controllers/usersController");

const createUserHandler = async (req, res) => {
    const { name, lastName, address, email, phone, role, password } = req.body;
    try {
        const response = await createUser({name, lastName, address, email, phone, role, password});
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

const  updateUserHandler = async (req, res) => {
    try {
        const { id, name, lastName, address, email, phone, role, password } = req.body;
        if(!id) throw Error("El id es obligatorio");
        const response = await updateUser(id, name, lastName, address, email, phone, role, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createUserHandler,
    updateUserHandler,
}