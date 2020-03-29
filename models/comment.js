var mongoose = require("mongoose");


var commentSchema = mongoose.Schema({
    text:String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created:String,
    // lastedited:String
});

// author:[
//     {
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     }
// ] THIS WOULD STORE JUST THE ID IN THE SYSTEM. BUT SINCE WE NEED THE USERNAME, AUTHOR IS MADE AN OBJECT.

// console.log("IN HERE");

module.exports = mongoose.model("Comment",commentSchema);