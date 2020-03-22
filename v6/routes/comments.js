var express = require("express");
var router = express.Router();
var Place = require("../models/place");
var Comment = require("../models/comment");

router.get("/places/:id/comments/new",checkAuthentication,function(req,res){
    Place.findById(req.params.id,function(err,foundplace){
       if(err){
          console.log(err);
       }else{
          // console.log(foundplace);
          res.render("comments/new",{thefoundplace:foundplace});
       }
    });
 
 });
 
 router.post("/places/:id/comments",checkAuthentication,function(req,res){
    Place.findById(req.params.id,function(err,foundplace){
       if(err){
          res.redirect("/places");
       }else{
          Comment.create(req.body.comment,function(err,foundcomment){
             if(err){
                console.log(err)
             } else {
               //  console.log(req.user.username);
               foundcomment.author.id=req.user._id;
               foundcomment.author.username=req.user.username;
               // console.log(foundcomment);
               foundcomment.save();
                foundplace.comments.push(foundcomment);
                foundplace.save();
               //  console.log(foundcomment);
               //  console.log(foundplace);
                res.redirect("/places/"+ foundplace._id);
 
             }
          });
       }
    });
 });
 function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
       //  res.redirect("/");
       return next();
    } else{
       res.redirect("/login");
    }
 };
 

 module.exports = router;