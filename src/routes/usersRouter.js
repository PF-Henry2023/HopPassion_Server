const { Router } = require("express");
const usersRouter = Router();
const {
  checkRolesExisted,
  checkDuplicateUserNameOrEmail,
  isAdmin,
  verifyToken
} = require("../utils/authJwt");
const {
  createUserHandler,
  updateUserHandler,
  signinHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  loginOauth,
  signupOauth,
} = require("../handlers/usersHandler");

usersRouter.post("/signup", checkDuplicateUserNameOrEmail, createUserHandler); // funcion para verificar los roles: checkRolesExisted  (NO USAR POR EL MOMENTO)
usersRouter.post("/signin", signinHandler);
usersRouter.put("/update/:id", updateUserHandler);
usersRouter.get("/allUsers", verifyToken, isAdmin, getAllUsersHandler);
usersRouter.get("/:id", getUserByIdHandler);

// logueo con terceros(Google)
usersRouter.post("/login/oauth2.0", loginOauth);
usersRouter.post("/signup/oauth2.0", signupOauth);

module.exports = usersRouter;
