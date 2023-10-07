const {
  createUser,
  updateUser,
  signIn,
  getAllUsers,
  getUserById,
  getUser,
} = require("../controllers/usersController");

const createUserHandler = async (req, res) => {
  const { name, lastName, address, email, phone, role, password } = req.body;
  try {
    const response = await createUser({
      name,
      lastName,
      address,
      email,
      phone,
      role,
      password,
    });
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const updateUserHandler = async (req, res) => {
  const userId = req.params.id;
  const updateUserData = req.body;
  try {
    const response = await updateUser(userId, updateUserData);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signinHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authentication({ email, password });
    res
      .status(200)
      .header("authorization", `Bearer ${token}`)
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsersHandler = async (req, res) => {
  //ver
  try {
    const response = await getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  //ver
  const { id } = req.params;
  try {
    const response = await getUserById(id);
    if (!response) res.status(404).json({ error: "User not found" });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const user = async (req, res) => {
  try {
    const userData = await getUser(req.user);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: "Unauthorized" });
  }
};

module.exports = {
  createUserHandler,
  updateUserHandler,
  signinHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  user,
};
