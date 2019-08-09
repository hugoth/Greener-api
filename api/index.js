const router = require("express").Router();

router.use("/user", require("./user/routes"));
router.use("/post", require("./post/routes"));
router.use("/tag", require("./tag/routes"));

module.exports = router;
