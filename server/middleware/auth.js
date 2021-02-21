const jwt = require("jsonwebtoken");
const config = require("../config/key");

// function auth(req, res, next) {
//   const token = req.header("x-auth-token");
//   if (!token) return res.status(401).send("Access denied. No token provided.");
//
//   try {
//     const decodedPayload = jwt.verify(token, config.jwtPrivateKey);
//     req.user = decodedPayload;
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
// }

function auth(req, res, next) {
  let token = req.header("authorization") ? req.header("authorization").split(" ") : null
  if (!token) {
    return res.status(401)
        .json({ code: 401, message: "Access denied. No token provided."});
  }
  else if (token[0] !== 'Bearer') {
    return res.status(401)
        .json({ code: 401, message: `Invalid ${token[0]}`});
  }

  jwt.verify(token[1], config.jwtAccessToken, async (err, user) => {
    if (user) {
      req.user = user;
      next();
    }
    else if (err.message === "jwt expired") {
      return res.status(401).json({
        code: res.statusCode,
        message: "Access token expired"
      });
    }
    else {
      console.error(err);
      return res.status(400)
          .json({code: res.statusCode, message: "Invalid token"
      });
    }
  });
}

module.exports = auth;
