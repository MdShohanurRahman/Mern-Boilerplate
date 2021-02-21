const config = require("../config/key");

module.exports = function() {
    if (!config.jwtAccessToken || !config.jwtRefreshToken) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
    }
};
