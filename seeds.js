var mongoose = require("mongoose");
var Place = require("./models/place");
var Comment = require("./models/comment");
var data = [
    {
        name:"Delhi", 
        image:"//live.staticflickr.com/4228/34459644290_e9d32391f3_z.jpg",
        description: "India's capital and major gateway to the country, contemporary Delhi is bustling metropolis, which successfully combines in its fold the ancient and the modern. Its Strategic location was one of the prime reasons why successive dynasties chose it as their seat of power."
     },
     {
              name:"Mumbai", 
              image:"//live.staticflickr.com/65535/48823555161_2a7d4a809f_c.jpg",
              description:"Mumbai is the commercial capital of India. It is also known as the city that never sleeps. Mumbai is the perfect blend of culture, customs and lifestyles. Mumbai is India's most cosmopolitan city, its financial powerhouse and the nerve center of India's fashion industry."
    },
    {
        name:"Bangalore", 
        image:'//live.staticflickr.com/6028/5982333502_7d9524b414_b.jpg',
        description:"Bangalore is one of Asia's fastest growing cities, and India's fifth largest city. Situated at an altitude of 920 metres above sea level, Bangalore is the principal administrative, cultural, commercial and industrial centre of the South Indian State of Karnataka."
    }
]


function seedDB(){
    Place.remove({},function(err){
        if(err){
            console.log(err);
        }
            console.log("removed places");
            data.forEach(function(seed){
                Place.create(
                    seed,function(err, place){
                    if(err){
                       console.log(err);
                    } else{
                       console.log("newly created  ");
                        Comment.create(
                            {
                                text:"Amazing place",
                                author:"Roan"
                            }, function(err,comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    place.comments.push(comment);
                                    place.save();
                                    console.log("created new comment");
                                }
                                
                            }); 
                    }
                 });
            });
           
    });
    

}
module.exports = seedDB;

