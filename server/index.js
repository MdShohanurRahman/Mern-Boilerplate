const express = require("express");
const app = express();
require("./startup/config")();
require("./startup/database")();
require("./startup/routes")(app);
require("./startup/validation")();
// require("./startup/prod")(app);
// const logging = require("./startup/logging")();


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.info(`Server Listening on ${port}`)
});
