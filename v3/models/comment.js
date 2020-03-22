var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text:String,
    author:String
});

// console.log("IN HERE");

module.exports = mongoose.model("Comment",commentSchema);