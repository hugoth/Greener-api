const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: Object, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
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
