var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//dabase name YelpCamp cannot contain any space in the end
mongoose.connect("mongodb://localhost:27017/YelpCamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgroundSchema = new mongoose.Schema({
   name : String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name : "Rukiya Safari",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0f/14/ee/89/rukiya-safari-camp-in.jpg",
        description: "This is Safari"
    }, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            console.log("Newly Created Campground: ");
            console.log(campground);
        }
    });

app.get("/", function(req, res){
  res.render('main');
});

app.get("/campgrounds", function(req, res){
    //retrieve all the campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds : allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var img = req.body.image;
    var des = req.body.description;
    var newCampground = {name : name, image : img, description: des};
    //campgrounds.push(newCampground);
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(req, res){
  console.log("Yelp Camp start");
});