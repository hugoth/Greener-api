const mongoose = require("mongoose");
const TagSchema = require("./schema");

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;
