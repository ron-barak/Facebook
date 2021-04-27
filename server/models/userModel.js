const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  bio: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  image: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
    default:
      "https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg",
  },

  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtKey"));
  return token;
};

const User = mongoose.model("users", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    address: Joi.string().min(2).max(400).required(),
    bio: Joi.string().min(2).max(400).required(),
    image: Joi.string().min(11).max(1024),
  });

  return schema.validate(user, { abortEarly: false });
};

exports.User = User;
exports.validate = validateUser;
