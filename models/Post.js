const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
  },
  images: [String],
  videos: [String],
  audio: [{ type: String }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
