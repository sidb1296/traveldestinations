var express = require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Passport = require("passport");
var LocalStrategy = require("passport-local")
var Place = require("./models/place");
var seedDB = require("./seeds");
var Comment =require("./models/comment");
var User = require("./models/user");




mongoose.connect('mongodb://127.0.0.1:27017/destinations', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
// seedDB();

app.use(require("express-session")({
   secret: "It can be anything I want it to be. That's the way it is.",
   resave:false,
   saveUninitialized:false

}));
app.use(Passport.initialize());
app.use(Passport.session());
Passport.use(new LocalStrategy(User.authenticate()));
Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   //middleware
   //so that curUser:req.user this is not
   // required to pass everytime on every
   // page
   res.locals.curUser = req.user;
   next();
});

app.get('/', function (req, res) {
    res.render("landing");
 });

 app.get('/places', function (req, res) {

// console.log(req.user);
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

app.get("/places/:id/comments/new",checkAuthentication,function(req,res){
   Place.findById(req.params.id,function(err,foundplace){
      if(err){
         console.log(err);
      }else{
         // console.log(foundplace);
         res.render("comments/new",{thefoundplace:foundplace});
      }
   });

});

app.post("/places/:id/comments",checkAuthentication,function(req,res){
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

//========================================================
//AUTHENTICATION

app.get("/register",function(req,res){
   res.render("register");
});
app.post("/register",function(req,res){
   User.register(new User({username: req.body.username}),req.body.password,function(err,user){
      if(err){
         console.log(err);
         return res.render("register")
      }else{
         Passport.authenticate("local")(req,res,function(){
               res.redirect("/places");
         })
      }
   });
});

//login

app.get("/login",function(req,res){
   res.render("login");

});
app.post("/login", Passport.authenticate("local",
      {successRedirect:"/places",
      failureRedirect:"/login"}), 
      function(req,res){
  
});

app.get("/logout",function(req,res){
   req.logout();
   res.redirect("/places");
});

function checkAuthentication(req,res,next){
   if(req.isAuthenticated()){
      //  res.redirect("/");
      return next();
   } else{
      res.redirect("/login");
   }
};

app.listen(3000, function () {
    console.log("Example app listening ");
 });
