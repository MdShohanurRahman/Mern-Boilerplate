const mongoose = require("mongoose");
const winston = require("winston");
const config = require("../config/key");

module.exports = function connectToDatabase() {
    const db = config.mongoURI
    mongoose
        .connect(
            db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => winston.info(`Connected to ${db} successfully...`));
};



