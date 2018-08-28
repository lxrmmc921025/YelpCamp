var express      = require("express"),
     app          = express(),
     bodyParser  = require("body-parser"),
     mongoose     = require("mongoose"),
     Campground   = require("./models/campground"),
    seedDB         = require("./seeds");

//dabase name YelpCamp cannot contain any space in the end
mongoose.connect("mongodb://localhost:27017/YelpCamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB();

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

//create - add new campground to DB
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
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
  console.log("Yelp Camp start");
});