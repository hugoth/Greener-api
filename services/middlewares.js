const bodyParser = require("body-parser");
const cors = require("cors");

const setUpMiddlewares = app => {
  app.use(cors());
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
};

module.exports.setUpMiddlewares = setUpMiddlewares;
