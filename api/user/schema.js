const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
  },
  email: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  susbcription: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  hash: { type: String },
  salt: { type: String },
  token: { type: String },
  profile_pic: { type: String },
  idGoogle: { type: String }
});

UserSchema.index({
  name: "text"
});
// Index creation for searching string query on the name property

module.exports = UserSchema;
