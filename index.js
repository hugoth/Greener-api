const express = require("express");

const { setUpMiddlewares } = require("./services/middlewares");
const { connect } = require("./services/db");

const app = express();
connect();
setUpMiddlewares(app);

app.use("/api", require("./api"));
const user = require("./api/user/routes");
const post = require("./api/post/routes");
app.use(user);
app.use(post);

app.listen(process.env.PORT || 3003, () => {
  console.log("Server started");
});
