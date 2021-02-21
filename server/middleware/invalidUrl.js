module.exports = function(req, res, next) {
    res.status(404).json({code: res.statusCode, message: "Invalid Url"});
};
