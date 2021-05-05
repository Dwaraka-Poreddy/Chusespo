const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
  {
    name: "Spiti Valley",
    image:
      "https://toib.b-cdn.net/wp-content/uploads/2017/08/spiti-valley-himachal-pradesh.jpg",
    descriptiom: "blah blah blah blah",
  },
  {
    name: "Chandratal Lake",
    image:
      "https://toib.b-cdn.net/wp-content/uploads/2017/08/chandratal-lake-himachal-pradesh.jpg",
    descriptiom: "blah blah blah blah",
  },
  {
    name: "Solang Valley",
    image:
      "https://toib.b-cdn.net/wp-content/uploads/2017/08/solang-valley-manali.jpg",
    descriptiom: "blah blah blah blah",
  },
];

function seedDB() {
  Campground.deleteMany({}, function (err) {
    if (err) console.log(err);
    else {
      console.log("removed everything");
      data.forEach(function (seed) {
        Campground.create(seed, function (err, campground) {
          if (err) console.log(err);
          else console.log("added");
          Comment.create(
            {
              text:
                "This is a great place except for loss of internet connectivity",
              author: "Boomer",
            },
            function (err, comment) {
              if (err) console.log(err);
              else {
                campground.comments.push(comment);
                campground.save();
                console.log("comment added");
              }
            }
          );
        });
      });
    }
  });
}
module.exports = seedDB;
