const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");
seedDB();
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
mongoose.connect(
  "mongodb+srv://dwaraka:asusasusasus@yelpcamp.g2ymr.mongodb.net/CampGroundsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

app.get("/", function (req, res) {
  res.render("landing");
});
app.get("/campgrounds", function (req, res) {
  Campground.find({}, function (err, campgrounds) {
    res.render("campgrounds/index", { campgrounds: campgrounds });
  });
  // res.render("campgrounds", { campgrounds: campgrounds });
});
app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
});
app.get("/campgrounds/:id", function (req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, campground) {
      res.render("campgrounds/show", { campground: campground });
      //console.log(campground);
    });
});

app.post("/campgrounds", function (req, res) {
  var newCampground = new Campground({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  });
  newCampground.save(function (err) {
    if (err) console.log(err, campgrounds);
    else {
      res.redirect("/campgrounds");
      console.log("New ground succesfully added");
    }
  });
});

app.get("/campgrounds/:id/comments/new", function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) console.log(err);
    else {
      res.render("comments/new", { campground: campground });
    }
  });
});

app.post("/campgrounds/:id/comments", function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) console.log(err);
        else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server running on port 3000");
});
