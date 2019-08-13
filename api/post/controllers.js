const Post = require("./model"); // call post Model
const User = require("../user/model");
const Tag = require("../tag/model");

const controllers = require("../tag/controllers");

// CODE :
// 605 : missing parameter on create Post

async function createPost(req, res) {
  try {
    const { title, user, description, content, imgUrl, tags } = req.body.data;
    if ((!title || !user || !description || !content, !tags)) {
      res.status(605).json({ message: "Parameter missing" });
    }

    const tagsFiltered = await controllers.createTag(tags);
    console.log("tagsfiltered", tagsFiltered);
    const SearchUser = await User.findById(user);

    const date = Date.now();
    const newPost = new Post({
      title,
      user: SearchUser,
      content,
      description,
      imgUrl,
      date,
      tags: tagsFiltered
    });

    const updateTag = await controllers.updatePostTags(newPost.tags, newPost);
    if (!updateTag) {
      res.status(401).json({ message: "saving tags not working" });
    }
    await SearchUser.posts.push(newPost._id);
    await SearchUser.save();
    await newPost.save();

    res.status(200).json({ message: "Post created", newPost });
  } catch (err) {
    res.status(400).json({ err: err.message });
    console.log("err", err.message);
  }
}

async function getPosts(_, res) {
  try {
    const posts = await Post.find().populate("tags");
    posts.reverse();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getPostPopular(_, res) {
  try {
    const posts = await Post.find().sort({ likes: -1 });
    const popularPosts = posts.slice(0, 3);
    res.json(popularPosts);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
}

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    await controllers.updateTags(post.tags); // update tags, incremement number of visists
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

async function getSimilarPost(req, res) {
  console.log(req.params);

  try {
    const originalPost = await Post.findById(req.params.id);
    const posts = [];
    let similarPosts = [];

    await Promise.all(
      originalPost.tags.map(async tag => {
        const searchTag = await Tag.findById(tag._id).populate({
          path: "posts",
          model: "Post"
        });

        searchTag.posts.map(post => {
          posts.push(post);
        });
        similarPosts = posts.filter(post => {
          return post._id != req.params.id;
        });
      })
    );

    if (!similarPosts) {
      res.status(400).json({ message: "not found" });
    }
    res.json(similarPosts);
  } catch (err) {
    console.log(err.message);

    res.status(400).json({ error: err.message });
  }
}

module.exports.createPost = createPost;
module.exports.getPosts = getPosts;
module.exports.getPostPopular = getPostPopular;
module.exports.getPost = getPost;
module.exports.addLikePost = addLikePost;
module.exports.getSimilarPost = getSimilarPost;
