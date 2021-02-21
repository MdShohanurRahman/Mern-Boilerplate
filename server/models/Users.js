const Joi = require("joi");
const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity").default;
const jwt = require("jsonwebtoken");
const config = require("../config/key");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    _.pick(this, ["_id", "isAdmin"]),
    config.jwtPrivateKey,
    {expiresIn: "30m"}
  );
};

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
      _.pick(this, ["_id", "isAdmin"]),
      config.jwtAccessToken,
      {expiresIn: "30m"}
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
      _.pick(this, ["_id", "isAdmin"]),
      config.jwtRefreshToken,
      {expiresIn: "30m"}
  );
};


function getUsersModel() {
  return mongoose.model("Users", userSchema);
}

const User = getUsersModel();

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity().required(),
  })

  return schema.validate(user);
}

module.exports = {
  User: User,
  validate: validateUser
};
