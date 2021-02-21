require("dotenv/config")
console.log("Environment set to", process.env.NODE_ENV || "Development")
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
