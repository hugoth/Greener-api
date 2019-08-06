const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/Greener",
    { useNewUrlParser: true },
    () => console.log("mongoose is connected")
  );
};

module.exports.connect = connect;
