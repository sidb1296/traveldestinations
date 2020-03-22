var express = require("express");
var router = express.Router();
var Place = require("../models/place");
var middleware = require("../middleware/index.js"); //you can say just ../middleware and it willautomatically require index.js always
router.get('/places', function (req, res) {

    // console.log(req.user);
          Place.find({},function(err,foundplaces){
            //  function checkit(){
            //      if(req.user._id==)
            //  }
             if(err){
               
                console.log(err);
             }else{
               //  checkit();
               //  console.log(foundplaces[0].comments);
               //  console.log(req.originalUrl);

                res.render("places/index",{places:foundplaces});

             }
          });
    
     });
     
     router.post('/places',middleware.checkAuthentication, function (req, res) {
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
         // console.log(req.user._id);

          console.log(place);
          res.redirect("/places");
       }
    });
     });
    
     router.get('/places/new', middleware.checkAuthentication, function (req, res) {
      
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
    //EDTI ROUTES

   router.get("/places/:id/edit",middleware.checkOwnershipOfPlaces,function(req,res){
   
         Place.findById(req.params.id, function(err,foundPlace){
            res.render("places/edit",{newplace:foundPlace});
         });
   });

    //UPDATE ROUTES
   router.put("/places/:id",middleware.checkOwnershipOfPlaces,function(req,res){
      // User.findById(req.user._id, function(err,foundUser){
      //    if(err){
      //       console.log("It doesnt work");
      
      //    }else{
               Place.findByIdAndUpdate(req.params.id,req.body.updatedplace,function(err,updatedPlace){
         
               if(err){
                  res.redirect("/places");     
               }else{
                  res.redirect("/places/" + req.params.id );
                  // console.log(updatedPlace.author.id);
      
               }
            });
    
            // console.log(foundUser);
            
         // }
   // });
      
   });


   //DESTROY Place ROUTES

router.delete("/places/:id",middleware.checkOwnershipOfPlaces,function(req,res){

   Place.findByIdAndDelete(req.params.id, function(err,foundPlace){
      if(err){
         res.redirect("/places");   
      }else{
         console.log(req.user._id);

         res.redirect("/places");   
      }
   });   

});



   
    module.exports = router;