const router = require("express").Router();

router.use("/user", require("./user/routes"));
router.use("/post", require("./post/routes"));

module.exports = router;
