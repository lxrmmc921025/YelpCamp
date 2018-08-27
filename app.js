var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
    {name : "A", image : "http://www.sapminature.com/wp-content/uploads/2017/06/SapmiNatureCamp_auroraslider.jpg"},
    {name : "B", image : "https://omni.se/samisk-ekolodge-varldsbast-enligt-nat-geo/a/k5656"},
    {name : "C", image : "https://media-cdn.tripadvisor.com/media/photo-s/0f/14/ee/89/rukiya-safari-camp-in.jpg"}
]

app.get("/", function(req, res){
  res.render('main');
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds : campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var img = req.body.image;
    var newCampground = {name : name, image : img};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(req, res){
  console.log("Yelp Camp start");
});