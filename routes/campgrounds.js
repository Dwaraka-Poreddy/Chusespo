var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
router.get("/", function (req, res) {
  Campground.find({}, function (err, campgrounds) {
    res.render("campgrounds/index", {
      campgrounds: campgrounds,
      currentUser: req.user,
    });
  });
});

router.post("/", isLoggedIn, function (req, res) {
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = new Campground({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    author: author,
  });
  newCampground.save(function (err) {
    if (err) console.log(err, campgrounds);
    else {
      res.redirect("/campgrounds");
      console.log("New ground succesfully added");
    }
  });
});

router.get("/new", isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, campground) {
      res.render("campgrounds/show", { campground: campground });
      //console.log(campground);
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
