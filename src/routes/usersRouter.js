const { Router } = require("express");
const usersRouter = Router();
const { checkRolesExisted, checkDuplicateUserNameOrEmail} = require ("../utils/authJwt");
const { createUserHandler, updateUserHandler, signinHandler, getAllUsersHandler, getUserByIdHandler } = require("../handlers/usersHandler");

usersRouter.post("/signup", checkDuplicateUserNameOrEmail, checkRolesExisted, createUserHandler);
usersRouter.post("/signin", signinHandler);
usersRouter.put("/update/:id", updateUserHandler);
usersRouter.get("/allUsers", getAllUsersHandler);
usersRouter.get("/:id", getUserByIdHandler);

module.exports = usersRouter;