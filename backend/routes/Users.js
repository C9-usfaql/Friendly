const express = require("express");
const { register, login, getUserById} = require("../controllers/Users");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const usersRouter = express.Router();


usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/:id",authentication, getUserById);
module.exports = usersRouter;