var express = require("express");
var app= express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var places = [
   {name:"Delhi", image:"//live.staticflickr.com/4228/34459644290_e9d32391f3_z.jpg"},
   {name:"Mumbai", image:"//live.staticflickr.com/65535/48823555161_2a7d4a809f_c.jpg"}
]

app.get('/', function (req, res) {
    res.render("landing");
 });

 app.get('/places', function (req, res) {
    res.render("places",{places:places});
 });
 
 app.post('/places', function (req, res) {
   var name = req.body.name;
   var image = req.body.image;
    
   var newPlace = {name:name,image:image};
   places.push(newPlace);

    res.redirect("/places");
 });

 app.get('/places/new', function (req, res) {
   
    res.render("new");
 });
 



app.listen(3000, function () {
 
    console.log("Example app listening ");
 });
