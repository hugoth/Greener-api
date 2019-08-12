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
      const user = {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name
      };

      res.status(200).json({ message: "User sign up", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

async function signUpGoogle(req, res) {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const user = {
        email: existingUser.email,
        name: existingUser.name,
        profile_pic: existingUser.profile_pic,
        idGoogle: existingUser.idGoogle,
        id: existingUser._id
      };
      res.status(200).json(user);
    } else {
      const { email, name, profile_pic, idGoogle } = req.body;
      const first_name = name.first_name;
      const last_name = name.last_name;

      const user = new User({
        email,
        name: {
          first_name,
          last_name
        },
        profile_pic,
        idGoogle
      });
      await user.save();

      res.status(200).json({ message: "User Google sign up", user });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
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
      id: searchUser._id,
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

async function addFollower(req, res) {
  try {
    const { userFollowedId, userFollowerId } = req.body;
    const userFollowed = await User.find(userFollowedId);
    const userSubscriber = await User.findById(userSubscriberId);

    userFollowed.followers.push(userFollowerId);
    userSubscriber.subscription.push(userFollowedId);

    await userFollowed.save();
    await userSubscriber.save();
    res.status(200).json({ message: "susbcription success" });
  } catch (error) {
    res.status(600).json({ error: error.message });
  }
}

async function getPostUsers(req, res) {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    const posts = user.posts;
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports.signUp = signUp;
module.exports.signUpGoogle = signUpGoogle;
module.exports.logIn = logIn;
module.exports.addFollower = addFollower;
module.exports.getPostsUser = getPostUsers;
