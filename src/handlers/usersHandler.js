const {
  createUser,
  updateUser,
  signIn,
  getAllUsers,
  getUserById,
  newUserOauth,
  authenticationOauth,
  totalUsersStadistics,
} = require("../controllers/usersController");
const nodemailer = require("nodemailer");
require("dotenv").config();
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const createUserHandler = async (req, res) => {
  const {
    name,
    lastName,
    address,
    email,
    phone,
    role,
    password,
    postalCode,
    city,
    country,
  } = req.body;
  try {
    const response = await createUser({
      name,
      lastName,
      address,
      email,
      phone,
      role,
      password,
      postalCode,
      city,
      country,
    });
    await sendWelcomeEmail(email);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const sendWelcomeEmail = async (userEmail) => {
  // Send a welcome email to the user
  const mailOptions = {
    from: emailUser,
    to: userEmail,
    subject: "Bienvenido a Hop Passion!",
    text: "Bienvenido a nuestra plataforma. Estamos felices de tener por aca!",
    html: `
      <p>Welcome to our platform. We are excited to have you on board!</p>
      <img src="cid:unique-image-id" alt="Welcome Image" />
    `,
    attachments: [
      {
        filename: "welcome-image.png", // The name for the attached file
        path: "src/utils/hombre-beber-cerveza.webp", // Replace with the actual path to your image
        cid: "unique-image-id", // A unique identifier for the image
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent to: " + userEmail);
  } catch (error) {
    console.error("Error sending welcome email: " + error);
  }
};

const updateUserHandler = async (req, res) => {
  const userId = req.userId;
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
    const token = await signIn(email, password);
    res
      .status(200)
      .header("authorization", `Bearer ${token}`)
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(404).json({ error: "Invalid email or password" });
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
  const id = req.userId;
  try {
    const response = await getUserById(id);
    if (!response) res.status(404).json({ error: "User not found" });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//AUTENTICACION CON TERCEROS:
const signupOauth = async (req, res) => {
  console.log("entro a la funcion");
  const { tokenId } = req.body; //encoded token
  try {
    const response = await newUserOauth(tokenId);
    console.log(response);
    return res.status(200).json({ message: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const loginOauth = async (req, res) => {
  const { tokenId } = req.body; //Encoded token
  try {
    const tokenResponse = await authenticationOauth(tokenId);
    res.status(200).json({ token: tokenResponse });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createUserHandler,
  updateUserHandler,
  signinHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  signupOauth,
  loginOauth,
};
