var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/demo", {useNewUrlParser: true});

var dogSchema = new mongoose.Schema({
   name : String,
   age: Number,
   temperament: String
});

//we compile the schema into a model and save it to variable dog, where "newDog " is the collection name
var Dog = mongoose.model("newDog", dogSchema);

//save data into database
var george = new Dog({
    name: "George",
    age: 11,
    temperament: "Grouchy"
});

//call back function to make code execute
// george.save(function(err, dog){
//     if (err){
//         console.log("Something Wrong!");
//     } else {
//         console.log("We Just Saved");
//         console.log(dog);
//     }
// });

Dog.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if (err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log
Dog.find({}, function(err, dogs){
    if (err) {
        console.log("Error!");
        console.log(err);
    } else {
        console.log("ALL dogs");
        console.log(dogs);
    }
});

