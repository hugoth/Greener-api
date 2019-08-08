const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.post("/post/create", controller.createPost);
router.post("/post/add/like/:id/", controller.addLikePost);
router.get("/post/all", controller.getPosts);
router.get("/post/popular", controller.getPostPopular);
router.get("/post/:id", controller.getPost);

module.exports = router;
