const { Router } = require("express");
const usersRouter = Router();

const { createUserHandler, updateUserHandler } = require("../handlers/usersHandler");

usersRouter.post("/signup", createUserHandler);
usersRouter.put("/update", updateUserHandler);

module.exports = usersRouter;