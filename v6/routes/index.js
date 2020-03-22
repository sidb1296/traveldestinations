
 var express = require("express");
 var router = express.Router();
 var Passport = require("passport");
 var User = require("../models/user");
 
router.get("/register",function(req,res){
    res.render("register");
 });
 router.post("/register",function(req,res){
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
 
 router.get("/login",function(req,res){
    res.render("login");
 
 });
 router.post("/login", Passport.authenticate("local",
       {successRedirect:"/places",
       failureRedirect:"/login"}), 
       function(req,res){
 });
 
 router.get("/logout",function(req,res){
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

 module.exports = router;