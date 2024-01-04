const express = require("express");
const {createPost, getAllPosts} = require("../controllers/posts");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const postsRouter = express.Router();

postsRouter.post("/create", createPost);
postsRouter.get("/",authentication, getAllPosts);

module.exports = postsRouter;