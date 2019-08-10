const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.post("/tag/create", controller.createTag);
router.get("/tag/all", controller.getTags);
router.get("/tag/popular", controller.getTagPopular);
router.get("/tag/:id", controller.getTag);

module.exports = router;
