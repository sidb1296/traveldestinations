var express = require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Place = require("./models/place");
var seedDB = require("./seeds");
var Comment =require("./models/comment");
mongoose.connect('mongodb://127.0.0.1:27017/destinations', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
// seedDB();


app.get('/', function (req, res) {
    res.render("landing");
 });

 app.get('/places', function (req, res) {


      Place.find({},function(err,foundplaces){
         if(err){
            console.log(err);
         }else{
            // console.log(foundplaces);
            res.render("places/index",{places:foundplaces});
         }
      });

 });
 
 app.post('/places', function (req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newPlace={name:name,image:image,description:description};
Place.create(newPlace,function(err, place){
   if(err){
      console.log(err);
   } else{
      res.redirect("/places");
   }
});
 });

 app.get('/places/new', function (req, res) {

    res.render("places/new");
 });
 
app.get("/places/:id",function(req,res){
   var id = req.params.id;
   Place.findById(id).populate("comments").exec(function(err,foundplace){
      if(err){
         console.log(err);
      }else{
         // console.log(foundplace);
         res.render("places/show",{theplace:foundplace});
      }
   });
});

//=================================================================
//COMMENTS ROUTE

app.get("/places/:id/comments/new",function(req,res){
   Place.findById(req.params.id,function(err,foundplace){
      if(err){
         console.log(err);
      }else{
         // console.log(foundplace);
         res.render("comments/new",{thefoundplace:foundplace});
      }
   });

});

app.post("/places/:id/comments",function(req,res){
   Place.findById(req.params.id,function(err,foundplace){
      if(err){
         res.redirect("/places");
      }else{
         Comment.create(req.body.comment,function(err,foundcomment){
            if(err){
               console.log(err)
            } else {
               foundplace.comments.push(foundcomment);
               foundplace.save();
               res.redirect("/places/"+ foundplace._id);

            }
         });
      }
   });
});


app.listen(3000, function () {
    console.log("Example app listening ");
 });
