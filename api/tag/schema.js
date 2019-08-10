const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  label: { type: String, required: true },
  posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  numberOfPosts: { type: Number, default: 1, required: true },
  numberOfVisits: { type: Number, default: 0, required: true },
  posts: { type: Array, default: null, required: true }
});

TagSchema.index({
  title: "string"
});

module.exports = TagSchema;
