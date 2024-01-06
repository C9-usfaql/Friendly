const likesModel = require("../models/Like");
const postModel = require("../models/Post");

const createLike = (req,res)=>{
    const id = req.params.id;
    const admirer = req.token.userId;

    const newLike = new likesModel({
        admirer
    });

    newLike.save().then((result) => {
        postModel.findByIdAndUpdate(
            { _id: id},
            {$push: {likes: result._id}},
            {new: true}
        ).then((result) => {
            res.status(201).json({
                success : true,
                message: `Like Added`,
                like : result
            });
        }).catch((err) => {
            res.status.json({
                success : false,
                message : `Server Error`,
                err: err.message
            });
        });
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message
        });
    });
}

module.exports = {
    createLike
}