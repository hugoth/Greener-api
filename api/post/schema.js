const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String },
  tags: { type: Array },
  upVotes: { type: Number },
  likes: { type: Number },
  comments: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  date: { type: Number, required: true },
  published: { type: Boolean, default: false },
  types: { type: Number }
});

// UserSchema.index({
//   name: "text"
// });

module.exports = PostSchema;
