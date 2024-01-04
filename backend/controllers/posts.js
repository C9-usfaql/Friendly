const postModel = require("../models/Post");
function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    // Ensure leading zeros
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
  
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
  }
let now = new Date();
let formattedDate = formatDate(now);
const createPost = (req,res)=>{
    
    const {content, image, author} = req.body;
    const post = new postModel({
        content,
        image,
        author,
        datePost : formattedDate
    })

    post.save().then((result) => {
        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            author: result,
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
    });

}

const getAllPosts = (req, res)=>{
    const userId = req.token.userId;
    postModel.find().then((posts) => {
        console.log(posts);
        if(posts.length){
            res.status(200).json({
                success: true,
                message: `All the Posts`,
                userId: userId,
                posts: posts,
            });
        } else {
            res.status(200).json({
                success: false,
                message: `No Posts Yet`,
            });
        }
        
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
    });
}

const getAllPostByAuthor = (req, res)=>{
    let authorId =  req.token.userId;
    postModel.find({author: authorId}).then((posts) => {
        if(!posts){
            return res.status(404).json({
                success: false,
                message: `The author: ${authorId} has no Posts`,
              });
        }
        res.status(200).json({
            success: true,
            message: `All the Posts for the author: ${authorId}`,
            posts: posts,
          });
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
    });
};

const getPostById = (req, res)=>{
    let idPost = req.params.id;
    postModel.findById(idPost).populate("author").exec().then((post) => {
        if(!post){
            return res.status(404).json({
                success: false,
                message: `The Post with id => ${idPost} not found`,
              });
        }
        res.status(200).json({
            success: true,
            message: `The Post ${idPost} `,
            post: post,
          });
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
    });
}

const updatePostById = (req, res)=>{
    const postId = req.params.id;
    postModel.findByIdAndUpdate({_id : postId}, req.body).then((newPost) => {
        if(!newPost){
            return res.status(404).json({
                success: false,
                message: `The Post with id => ${postId} not found`,
              });
        }
        res.status(201).json({
            success: true,
            message: `Post updated`,
            post: newPost,
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
    });
}
module.exports = {
    createPost,
    getAllPosts,
    getAllPostByAuthor,
    getPostById,
    updatePostById
}