var Place = require("../models/place.js");
var Comment = require("../models/comment.js");

var middlewareObj ={};



middlewareObj.checkOwnershipOfPlaces = function checkOwnershipOfPlaces(req,res,next){
    if(req.isAuthenticated()){
       Place.findById(req.params.id, function(err,foundPlace){
          if(err){
             res.redirect("back");      
          }else{
             // oneof them is string and the other one is a mongoose
             // objecct. which prints and looks the same as a string
             // hence when we match them in the ifstatement, it wouldnt
             // Worke. mongoose has another way of comparing them.
             // if(req.user._id===foundPlace.author.id)

             if(req.user._id.equals(foundPlace.author.id)){
                next();
             }
             else{
                // console.log((req.user._id/foundPlace.author.id)===1);
                // console.log("FLASH MESSAGE GOES HERE");
                res.redirect("back");      

             }

          }
       });
     }else{
       res.redirect("back");
     }
   
 };


 middlewareObj.checkOwnershipOfComments =  function checkOwnershipOfComments(req,res,next){
   if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err,foundComment){
         if(err){
            res.redirect("back");      
         }else{
            // oneof them is string and the other one is a mongoose
            // objecct. which prints and looks the same as a string
            // hence when we match them in the ifstatement, it wouldnt
            // Worke. mongoose has another way of comparing them.
            // if(req.user._id===foundPlace.author.id)

            if(req.user._id.equals(foundComment.author.id)){
               next();
            }
            else{
               // console.log((req.user._id/foundPlace.author.id)===1);
               // console.log("FLASH MESSAGE GOES HERE");
               res.redirect("back");      

            }

         }
      });
    }else{
      res.redirect("back");
    }
  
};

middlewareObj.checkAuthentication = function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
       //  res.redirect("/");
       return next();
    } else{
       req.flash("error","You need to be Logged in first!");

       res.redirect("/login");

    }
 };



module.exports= middlewareObj