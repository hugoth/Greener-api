const Post = require("./model"); // call post Model

// CODE :
// 605 : missing parameter on create Post

async function createPost(req, res) {
  try {
    const { title, user, description, content, imgUrl } = req.body;
    if (!title || !user || !content) {
      res.status(605).json({ message: "Parameter missing" });
    }
    const date = Date.now();
    const newPost = new Post({
      title,
      user,
      content,
      description,
      imgUrl,
      date
    });
    await newPost.save();
    console.log(newPost);

    res.status(200).json({ message: "Post created", newPost });
  } catch (err) {
    console.log(err.message);

    res.status(400).json({ error: err.message });
  }
}

async function getPosts(_, res) {
  try {
    const posts = await Post.find().populate("user");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate("user");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports.createPost = createPost;
module.exports.getPosts = getPosts;
module.exports.getPost = getPost;
