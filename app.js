var express = require("express");
var app= express();
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Place = require("./models/place");
// var seedDB = require("./seeds");
var Comment =require("./models/comment");
var User = require("./models/user");

var placeRoutes = require("./routes/places");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");



// mongoose.connect('mongodb://127.0.0.1:27017/destinations', {useNewUrlParser: true});
mongoose.connect('mongodb://sid:Qwerty1234@ds211592.mlab.com:11592/destination', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(flash());
app.use(methodOverride("_method"));
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
   res.locals.url=req.url;
   res.locals.curUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.successlogin = req.flash("successlogin");
   next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(placeRoutes);

app.get('/', function (req, res) {
    res.render("landing");
 });


app.listen(3000, function () {
    console.log("Example app listening ");
 });
