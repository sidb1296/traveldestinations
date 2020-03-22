var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text:String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// console.log("IN HERE");

module.exports = mongoose.model("Comment",commentSchema);