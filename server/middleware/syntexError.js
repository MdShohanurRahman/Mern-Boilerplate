function syntaxError(error, req, res, next) {
    if (error instanceof SyntaxError){
      return res.status(500).send({data : "SyntaxError"});
    } else {
      next();
    }
  }

module.exports = syntaxError;