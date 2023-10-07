const { Router } = require("express");
const usersRouter = Router();
const {
  checkRolesExisted,
  checkDuplicateUserNameOrEmail,
  verifyToken,
} = require("../utils/authJwt");
const {
  createUserHandler,
  updateUserHandler,
  signinHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  user,
} = require("../handlers/usersHandler");

usersRouter.post("/signup", checkDuplicateUserNameOrEmail, createUserHandler); // funcion para verificar los roles: checkRolesExisted  (NO USAR POR EL MOMENTO)
usersRouter.post("/signin", signinHandler);
usersRouter.put("/update/:id", updateUserHandler);
usersRouter.get("/allUsers", getAllUsersHandler);
usersRouter.get("/:id", getUserByIdHandler);
usersRouter.get("/", verifyToken, user);

module.exports = usersRouter;
