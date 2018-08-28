var mongoose        = require("mongoose");
var Campground      = require("./models/campground");
var Comment          = require("./models/comment");

var data = [
    {
        name : "Cloud's Rest",
        image: "http://wafflefarm.com/wp-content/uploads/2016/12/WaffleFarmCampground_Sunset_ClubGroup-Camping-Slide.jpg",
        description : "bla bla bla"
    },
    {
        name : "Stony Fork",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgoW1v09ev2kFhpbEa5q_fzxaiVdMsfXLSiPuW-VKZ3dPaxvg7",
        description : "bla bla bla"
    },
    {
        name : "Clear Water",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDm5cqPwyHwMUgyb5ATLZYnae6jr_yM2IbPcW6NO-s_3BQmeec",
        description : "bla bla bla"
    }
]


function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");

        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");

                    //create a comment
                    Comment.create(
                        {
                            text: "blalbal",
                            author: "Homer"
                        }, function(err, comment){
                            if (err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            }) ;
        });
    });
}

module.exports = seedDB;