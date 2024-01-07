const express = require("express");
const {createPost, getAllPosts, getAllPostByAuthor, getPostById, updatePostById, deletePostById} = require("../controllers/posts");
const {createLike} = require("../controllers/likes");
const {createNewComment} = require("../controllers/comments");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const postsRouter = express.Router();

postsRouter.post("/create", authentication ,createPost);
postsRouter.get("/",authentication, getAllPosts);
postsRouter.get("/search_1",authentication, getAllPostByAuthor);
postsRouter.get("/search_2/:id",authentication, getPostById);
postsRouter.put("/:id",authentication, updatePostById);
postsRouter.delete("/:id",authentication, deletePostById);

postsRouter.get("/:id/like", authentication, createLike);
postsRouter.post("/:id/comment", authentication, createNewComment);
module.exports = postsRouter;