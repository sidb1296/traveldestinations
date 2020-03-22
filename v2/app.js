var express = require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/destinations', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var placeSchema= new mongoose.Schema({
   name:String,
   image:String,
   description:String
});

var Place = mongoose.model("Place",placeSchema);

// Place.create(
//    {
//       name:"Delhi", 
//       image:"//live.staticflickr.com/4228/34459644290_e9d32391f3_z.jpg",
//       description: "India's capital and major gateway to the country, contemporary Delhi is bustling metropolis, which successfully combines in its fold the ancient and the modern. Its Strategic location was one of the prime reasons why successive dynasties chose it as their seat of power."
//    },function(err, place){
//    if(err){
//       console.log(err);
//    } else{
//       console.log("newly created  ");
//       console.log(place);
//    }
// });
// Place.create(
//    {
//       name:"Mumbai", 
//       image:"//live.staticflickr.com/65535/48823555161_2a7d4a809f_c.jpg",
//       description:"Mumbai is the commercial capital of India. It is also known as the city that never sleeps. Mumbai is the perfect blend of culture, customs and lifestyles. Mumbai is India's most cosmopolitan city, its financial powerhouse and the nerve center of India's fashion industry."
//    },function(err, place){
//    if(err){
//       console.log(err);
//    } else{
//       console.log("newly created  ");
//       console.log(place);
//    }
// });
// Place.create(
//    {
//       name:"Bangalore", 
//       image:'//live.staticflickr.com/6028/5982333502_7d9524b414_b.jpg',
//       description:"Bangalore is one of Asia's fastest growing cities, and India's fifth largest city. Situated at an altitude of 920 metres above sea level, Bangalore is the principal administrative, cultural, commercial and industrial centre of the South Indian State of Karnataka."
//    },function(err, place){
//    if(err){
//       console.log(err);
//    } else{
//       console.log("newly created  ");
//       console.log(place);
//    }
// });



app.get('/', function (req, res) {
    res.render("landing");
 });

 app.get('/places', function (req, res) {


      Place.find({},function(err,foundplaces){
         if(err){
            console.log(err);
         }else{
            console.log(foundplaces);
            res.render("index",{places:foundplaces});
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

    res.render("new");
 });
 
app.get("/places/:id",function(req,res){
   var id = req.params.id;
   Place.findById(id, function(err,foundplace){
      if(err){
         console.log(err);
      }else{
         res.render("show",{theplace:foundplace});
      }
   });
});


app.listen(3000, function () {
    console.log("Example app listening ");
 });
