const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String },
  tags: { type: Array },
  likes: { type: Number, default: 0, required: true },
  visits: { type: Number, default: 0, required: true },
  comments: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  date: { type: Number, required: true },
  published: { type: Boolean, default: false },
  types: { type: Number }
});

PostSchema.index({
  likes: "number"
});

module.exports = PostSchema;
