const Post = require("./model"); // call post Model
const User = require("../user/model");
const Tag = require("../tag/model");

const controllers = require("../tag/controllers");

// CODE :
// 605 : missing parameter on create Post

async function createPost(req, res) {
  console.log(req.body.user);

  try {
    const { title, user, description, content, imgUrl, tags } = req.body;
    if ((!title || !user || !content, !tags)) {
      res.status(605).json({ message: "Parameter missing" });
    }

    const tagsFiltered = await controllers.createTag(tags);
    console.log("filteredTags", tagsFiltered);

    const SearchUser = await User.findById(user);
    console.log("user", SearchUser);

    const date = Date.now();
    const newPost = new Post({
      title,
      user,
      content,
      description,
      imgUrl,
      date,
      tags: tagsFiltered
    });

    SearchUser.posts.push(newPost._id);
    await SearchUser.save();
    await newPost.save();

    res.status(200).json({ message: "Post created", newPost });
  } catch (err) {
    res.status(400).json({ err: err.message });
    console.log(err.message);
  }
}

async function getPosts(_, res) {
  try {
    const posts = await Post.find().populate("user");
    posts.reverse();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getPostPopular(_, res) {
  try {
    const posts = await Post.find()
      .sort({ likes: -1 })
      .populate("user");

    const popularPosts = posts.slice(0, 3);
    res.json(popularPosts);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
}

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate("user");
    post.visits += 1;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function addLikePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
}

module.exports.createPost = createPost;
module.exports.getPosts = getPosts;
module.exports.getPostPopular = getPostPopular;
module.exports.getPost = getPost;
module.exports.addLikePost = addLikePost;
