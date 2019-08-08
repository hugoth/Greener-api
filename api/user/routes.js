const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.post("/user/signup", controller.signUp);
router.post("/user/signup/google", controller.signUpGoogle);
router.post("/user/login", controller.logIn);
router.get("/user/:id/follower/add", controller.addFollower);
router.get("/user/posts/:id", controller.getPostsUser);
// router.get("/user/all", controller.getUsers);
// router.get("/user/:id", controller.getUser);
// router.get("/user/search/:name", controller.searchUser);
// router.post("/user/update", controller.updateUser);

module.exports = router;
