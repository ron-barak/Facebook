const express = require("express");
const _ = require("lodash");
const { Post, validatePost } = require("../models/postModel");
const auth = require("../middleware/auth");
const router = express.Router();
const { User } = require("../models/userModel");

//---GET ALL POSTS---//
router.get("/all", (req, res) => {
  Post.find({}).then((data) => {
    res.json(_.reverse(data));
  });
});

//---GET USER POSTS---//
router.get("/my-posts", auth, async (req, res) => {
  const post = await Post.find({ user_id: req.user._id });
  res.send(post);
});

//---DELETE POST---//
router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

//---UPDATE POST---//
router.put("/:id", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = await Post.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  post = await Post.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(post);
});

//---GET ONE POST BY ID---//
router.get("/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

//---ADD NEW POST---//
router.post("/", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  user = await User.findOne({ _id: req.user._id });
  let post = new Post({
    postBody: req.body.postBody,
    user_id: req.user._id,
    user_name: user.name,
    user_img: user.image
      ? user.image
      : "https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg",
  });
 
  posts = await post.save();
  res.send(posts);
});

module.exports = router;
