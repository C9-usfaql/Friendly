const express = require("express");
const {createPost, getAllPosts, getAllPostByAuthor} = require("../controllers/posts");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const postsRouter = express.Router();

postsRouter.post("/create", createPost);
postsRouter.get("/",authentication, getAllPosts);
postsRouter.get("/searchPost",authentication, getAllPostByAuthor);

module.exports = postsRouter;