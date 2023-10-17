const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { decodeTokenOauth } = require("../utils/google");
const { userActiveDesactive } = require("../utils/generic_functions");
require("dotenv").config();
const { PASSWORD_JWT } = process.env;
const nodemailer = require("nodemailer");
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const createUser = async ({
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
}) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
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
    },
  });
  if (!created) throw Error("User already exists");
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      phone: user.phone,
      role: user.role,
      postalCode: user.postalCode,
      city: user.city,
      country: user.country,
    },
    PASSWORD_JWT,
    { expiresIn: 86400 }
  );
  return token;
};

const getUserById = async (id) => {
  const userById = await User.findOne({ where: { id } });
  if (!userById) throw Error("User not found");
  return userById;
};

const updateUser = async (id, dataUser) => {
  const allowedFields = [
    "name",
    "lastName",
    "address",
    "email",
    "phone",
    "password",
    "postalCode",
    "city",
    "country",
  ]; //contiene los nombres de los campos que se pueden actualizar
  const updateFields = Object.keys(dataUser); //Se obtienen los nombres de los campos que se desean actualizar
  const invalidFields = updateFields.filter(
    (field) => !allowedFields.includes(field)
  ); //validación para asegurarse de que los campos que se desean actualizar estén incluidos en la lista de campos permitidos
  if (invalidFields.length > 0) throw Error("Invalid Fields");

  await User.update(dataUser, { where: { id } });
  const user = await User.findByPk(id);
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      address : user.address,
      postalCode: user.postalCode,
      city: user.city,
      country: user.country,
    },
    PASSWORD_JWT,
    { expiresIn: 86400 }
  );

  return {
    status: `User '${dataUser.name}' updated successfully`,
  };
};

const signIn = async (email, password) => {
  const userFound = await User.findOne({ where: { email: email } });
  if (!userFound) throw Error("User not found");
  const matchPassword = await userFound.comparePassword(password);
  if (!matchPassword) throw Error("Invalid password");
  console.log(userFound);
  const token = jwt.sign(
    {
      id: userFound.id,
      name: userFound.name,
      lastName: userFound.lastName,
      role: userFound.role,
      email: userFound.email,
    },
    PASSWORD_JWT,
    { expiresIn: 86400 }
  );

  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  if (users.length === 0) throw Error("¡No hay usuarios en la base de datos!");
  return users;
};

//FUNCIONES AUTENTICACION CON TERCEROS:
// registro OAuth2: se utiliza para procesar y autenticar a un usuario que inicia sesión a través de Google OAuth2.
const newUserOauth = async (data) => {
  try {
    const { email, given_name, family_name, sub } = await decodeTokenOauth(
      data
    );
    const [{ id, role }, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: given_name,
        lastName: family_name,
        email,
        googleId: sub,
      },
    });
    if (!created) {
      throw new Error("User Already exist");
    }
    console.log("el usuario se creo con exito");
    await sendWelcomeEmail(email);
    const token = jwt.sign(
      { id, role, name: given_name, lastName: family_name },
      PASSWORD_JWT,
      { audience: "" }
    );
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

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

//login OAuth: controlador de autenticación que se utiliza para autenticar a un usuario que ha iniciado sesión a través de OAuth
const authenticationOauth = async (data) => {
  const { email } = await decodeTokenOauth(data);
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("¡A gmail account is not regiter for this user!");
  if (user.isActive === false) throw new Error("This user is banned");

  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    PASSWORD_JWT,
    { audience: "" }
  );
  return token;
};

module.exports = {
  createUser,
  updateUser,
  signIn,
  getAllUsers,
  getUserById,
  newUserOauth,
  authenticationOauth,
};
