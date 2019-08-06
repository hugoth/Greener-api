const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("./model"); // call user Model

// Status Code :

// 600 : Catch error
// 601 : User already exist on signup
// 602 : Mail, User not found on login
// 603 : Password incorrect on login

async function signUp(req, res) {
  const email = req.body.email;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(601).json({ message: "User with this mail already registered" });
  } else {
    try {
      const { password, name, email } = req.body;
      const first_name = name.first_name;
      const last_name = name.last_name;

      const token = uid2(16);
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);

      const newUser = new User({
        email,
        name: {
          first_name,
          last_name
        },
        token,
        salt,
        hash
      });
      await newUser.save();
      res.status(200).json({ message: "User sign up", newUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

async function logIn(req, res) {
  try {
    const searchUser = await User.findOne({ email: req.body.email });
    const password = req.body.password;
    if (!searchUser) {
      res.status(602).json({ error: "User not found" });
    }

    const user = {
      name: searchUser.name,
      token: searchUser.token,
      id: searchUser._id,
      posts: searchUser.posts,
      likes: searchUser.likes,
      email: searchUser.email
    };
    if (
      SHA256(password + searchUser.salt).toString(encBase64) === searchUser.hash
    ) {
      res.status(200).json({ message: "Vous êtes bien login", user });
    } else {
      res.status(603).json({ message: "password incorrect" });
    }
  } catch (error) {
    res.status(600).json({ error: error.message });
  }
}

module.exports.signUp = signUp;
module.exports.logIn = logIn;
