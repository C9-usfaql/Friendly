const express = require("express");
const { register, login, getUserById,updateDataUserById, followingUser} = require("../controllers/Users");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const usersRouter = express.Router();


usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/:id",authentication, getUserById);
usersRouter.put("/:id",authentication, updateDataUserById);
usersRouter.get("/:myId/:userId", authentication, followingUser);
module.exports = usersRouter;