const mongoose = require("mongoose");

const likeModel = new mongoose.Schema({
    liker: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

module.exports = mongoose.model("Like", likeModel);
