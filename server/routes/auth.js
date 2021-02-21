const express = require("express");
const router = express.Router();
const { User } = require("../models/Users");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/key");


const refreshTokensList = []

async function authenticateUser(clear, hashed) {
  return await bcrypt.compare(clear, hashed);
}

function validate(req) {
  const schema = Joi.object({
      email: Joi.string()
          .min(3)
          .max(255)
          .required()
          .email(),
      password: Joi.string()
          .min(6)
          .max(100)
          .required()
  })
  return schema.validate(req);
}


// Route to login user. (In this case, create an token);
router.post("/login", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ code: 400, message: error.details[0].message });

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(400).json({ code: 400, message: "Invalid email or password"});

      authenticateUser(req.body.password, user.password)
        .then(isValid => {
          if (!isValid) {
            return res.status(400).json({ code: 400, message: "Invalid email or password"});
          }

          let accessToken = user.generateAccessToken();
          let refreshToken = user.generateRefreshToken();
          refreshTokensList.push(refreshToken)

          return res.status(201).json({
              success: true,
              access_token: accessToken,
              refresh_token: refreshToken
          });
        })
        .catch(err => {
          logServerErrorAndRespond(err, `Authentication error`, res);
        });
    })
    .catch(err => {
      logServerErrorAndRespond(err, `Authentication error`, res);
    });
});


// Creates a new accessToken using the given refreshToken;
router.post("/refresh", (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken || !refreshTokensList.includes(refreshToken)) {
        return res.json({ message: "Refresh token not found, login again" });
    }

    // If the refresh token is valid, create a new accessToken and return it.
    jwt.verify(refreshToken, config.jwtRefreshToken, (err, user) => {
        if (!err) {
            const accessToken = jwt.sign({ id: user._id }, config.jwtAccessToken, {
                expiresIn: "20s"
            });
            return res.json({ success: true, accessToken });
        }
        else {
            return res.json({
                success: false,
                message: "Invalid refresh token"
            });
        }
    });
})


function logServerErrorAndRespond(err, friendlyMessage, res, statusCode = 500) {
  console.log(friendlyMessage, err);
  res.status(statusCode).json({ code: statusCode, message: `${friendlyMessage}: ${err.message}`});
}

module.exports = {
  router: router,
  database: {}
};
