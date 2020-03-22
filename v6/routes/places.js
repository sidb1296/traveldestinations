var express = require("express");
var router = express.Router();
var Place = require("../models/place");

router.get('/places', function (req, res) {

    // console.log(req.user);
          Place.find({},function(err,foundplaces){
             if(err){
                console.log(err);
             }else{
               //  console.log(foundplaces[0].comments);
               //  console.log(req.originalUrl);

                res.render("places/index",{places:foundplaces});

             }
          });
    
     });
     
     router.post('/places',checkAuthentication, function (req, res) {
       var name = req.body.name;
       var image = req.body.image;
       var description = req.body.description;
      var author ={
         id: req.user._id,
         username: req.user.username
      };
       var newPlace={name:name,image:image,description:description,author:author};
      //  newPlace.author.username=req.user.author.username; WE CANUSE THIS OR THAT AUTHOR OBJECT WE MADE
      //  newPlace.author.id= req.body.author.id;
    Place.create(newPlace,function(err, place){
       if(err){
          console.log(err);
       } else{
          console.log(place);
          res.redirect("/places");
       }
    });
     });
    
     router.get('/places/new', checkAuthentication, function (req, res) {
      
        res.render("places/new");
     });
     
    router.get("/places/:id",function(req,res){
       var id = req.params.id;

// Place.findById(id, function(err,newplace){
//    if(err){
//       console.log(err);

//    }else{
//       console.log(newplace.comments);
//       newplace.comments.splice(0,newplace.comments.length);
//       newplace.save();
//    }
// });
       Place.findById(id).populate("comments").exec(function(err,foundplace){
          if(err){
             console.log(err);
          }else{

             // console.log(foundplace);
             res.render("places/show",{theplace:foundplace});
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