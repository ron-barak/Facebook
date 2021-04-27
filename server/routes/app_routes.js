const users = require("./users");
const auth = require("./auth");
const posts = require("./post");

exports.routesInit = (app) => {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/posts", posts);

  app.use((req, res) => {
    res.status(404).json({ msg: "404 url page not found" });
  });
};
