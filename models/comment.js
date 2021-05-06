const mongoose = require("mongoose");
const commentSchema = {
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
};

module.exports = mongoose.model("Comment", commentSchema);
