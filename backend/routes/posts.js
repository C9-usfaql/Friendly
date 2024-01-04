const express = require("express");
const {createPost, getAllPosts, getAllPostByAuthor, getPostById, updatePostById, deletePostById} = require("../controllers/posts");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const postsRouter = express.Router();

postsRouter.post("/create", authentication ,createPost);
postsRouter.get("/",authentication, getAllPosts);
postsRouter.get("/search_1",authentication, getAllPostByAuthor);
postsRouter.get("/search_2/:id",authentication, getPostById);
postsRouter.put("/:id",authentication, updatePostById);
postsRouter.delete("/:id",authentication, deletePostById);

module.exports = postsRouter;