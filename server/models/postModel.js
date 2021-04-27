const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const postSchema = new mongoose.Schema({
  postBody: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },

  createdAt: { type: Date, default: Date.now },
  user_img: { type: String, ref: "users" },
  user_name: { type: String, ref: "users" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Post = mongoose.model("posts", postSchema);

const validatePost = (post) => {
  const schema = Joi.object({
    postBody: Joi.string().min(2).max(1024).required(),
  });

  return schema.validate(post);
};

exports.Post = Post;
exports.validatePost = validatePost;
