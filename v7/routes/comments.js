var express = require("express");
var router = express.Router();
var Place = require("../models/place");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js"); //you can say just ../middleware and it willautomatically require index.js always

router.get("/places/:id/comments/new",middleware.checkAuthentication,function(req,res){
    Place.findById(req.params.id,function(err,foundplace){
       if(err){
          console.log(err);
       }else{
          // console.log(foundplace);
          res.render("comments/new",{thefoundplace:foundplace});
       }
    });
 });

 router.post("/places/:id/comments",middleware.checkAuthentication,function(req,res){
    Place.findById(req.params.id,function(err,foundplace){
       if(err){
          res.redirect("/places");
       }else{
          Comment.create(req.body.comment,function(err,foundcomment){
             if(err){
                console.log(err)
             } else {
               // console.log(req.body.comment);
               // console.log(foundcomment);
               //  console.log(req.user._id);
               foundcomment.author.id=req.user._id;
               foundcomment.author.username=req.user.username;
               foundcomment.save();
                foundplace.comments.push(foundcomment);
                foundplace.save();
               //  console.log(foundcomment);
               //  console.log(foundplace);
               // console.log(req.body.comment);
               // console.log(foundcomment);

                res.redirect("/places/"+ foundplace._id);
 
             }
          });
       }
    });
 });


//EDIT COMMENT
 router.get("/places/:id/comments/:comment_id/edit",middleware.checkOwnershipOfComments,function(req,res){
   
      Place.findById(req.params.id,function(err,recievedPlace){
         if(err){
            res.redirect("/places");
      
         }else{
         Comment.findById(req.params.comment_id,function(err,foundCom){
            if(err){
               res.redirect("/places");
         
            }else{
            res.render("comments/edit",{recievedPl:recievedPlace,foundComment:foundCom});
         }

         });
      }
    });
   

});

 //UPDATE COMMENT

 router.put("/places/:id/comments/:comment_id",middleware.checkOwnershipOfComments,function(req,res){

   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,recievedComment){
      if(err){
         res.redirect("/places");
      
      }else{ // console.log(recievedComment);
      res.redirect("/places/"+req.params.id);
      }

   });
  
   // res.send("Hey");
 });


router.delete("/places/:id/comments/:comment_id",middleware.checkOwnershipOfComments,function(req,res){

   Comment.findByIdAndDelete(req.params.comment_id,function(err,foundCom){
      if(err){
         res.redirect("/places/"+req.params.id);   
      }else{
         res.redirect("/places/"+req.params.id);   
      }   
   });
});


 module.exports = router;