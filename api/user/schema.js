const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
  },
  email: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  token: { type: String, required: true }
});

UserSchema.index({
  name: "text"
});
// Index creation for searching string query on the name property

module.exports = UserSchema;
//  gender: { type: String, required: true },
// location: {
//     locale: { type: String, required: true, default: "fr" },
//     street: { type: String },
//     city: { type: String },
//     state: { type: String },
//     post_code: { type: String },
//     country: { tyep: String }
//   },
//   phone: { type: String },
//   tags: { type: Array },
//   birth_date: { type: Date },
//   login: {
//     hash: { type: String },
//     salt: { type: String },
//     token: { type: String }
//   },
