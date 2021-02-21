const error = require("../middleware/error");
const invalidUrl = require("../middleware/invalidUrl");
const morgan = require('morgan');
const users = require("../routes/users");
const auth = require("../routes/auth");
const post = require('../routes/post');
const express = require("express");

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
    app.use('/uploads', express.static('uploads'));

    // Serve static assets if in production
    if (process.env.NODE_ENV === "production") {
        // Set static folder
        // All the javascript and css files will be read and served from this folder
        app.use(express.static("client/build"));

        // index.html for all page routes html or routing and navigation
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
        });
    }
    app.use("/api/users", users.router);
    app.use("/api/auth", auth.router);
    app.use('/api/posts', post.router)
    app.use(morgan(`tiny`));
    app.use(error);
    app.use(invalidUrl);

};
