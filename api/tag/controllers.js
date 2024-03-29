const Tag = require("./model");
const Post = require("../post/model"); // call post Model
const User = require("../user/model");

async function createTag(tags) {
  try {
    const returnedTags = [];
    await Promise.all(
      tags.map(async tag => {
        let title = tag.label;
        const letters = title.split("");
        const firstChar = letters[0];

        if (firstChar !== "#") {
          letters.unshift("#");
          title = letters.join("");
        }

        if (tag.id) {
          searchTag = await Tag.findById(tag.id);
          searchTag.numberOfPosts += 1;
          await searchTag.save();
          returnedTags.push(searchTag._id);
        } else {
          const newTag = new Tag({
            label: title
          });
          await newTag.save();
          returnedTags.push(newTag._id);
        }
      })
    );
    return returnedTags;
  } catch (err) {
    console.log(err.message);
  }
}

async function updatePostTags(tags, post) {
  // insert posts in tags when created
  // console.log("yolo", tags, post);

  console.log(tags, post);

  try {
    await Promise.all(
      tags.map(async tag => {
        const updateTag = await Tag.findById(tag._id);
        updateTag.posts.push(post._id);
        await updateTag.save();
        return updateTag;
      })
    );
  } catch (err) {
    console.log(err.message);

    return err;
  }
}

async function updateTags(tags) {
  // increment visits
  try {
    await Promise.all(
      tags.map(async tag => {
        const updateTag = await Tag.findOne({ title: tag.label });
        updateTag.numberOfVisits += 1;
        await updateTag.save();
      })
    );
  } catch (err) {
    return err;
  }
}

async function getTags(_, res) {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function getTag(req, res) {
  console.log("get tag", req.params);

  try {
    const tag = await Tag.findById(req.params.id).populate({
      path: "posts",
      model: "Post"
    });

    if (tag) {
      res.status(200).json(tag);
    }
    res.status(404).json({ message: "not Found" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function getTagPopular(_, res) {
  try {
    const tags = await Tag.find().sort({ numberOfPosts: -1 });
    const popularTags = tags.slice(0, 5);
    res.json(popularTags);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
}

module.exports.createTag = createTag;
module.exports.getTags = getTags;
module.exports.getTag = getTag;
module.exports.updateTags = updateTags;
module.exports.updatePostTags = updatePostTags;
module.exports.getTagPopular = getTagPopular;
