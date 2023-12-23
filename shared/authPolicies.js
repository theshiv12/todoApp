const JWT = require("./jwt");

exports.loggedIn = function (req, res, next) {
    try {
      let decoded = JWT.verify(req, res);
      if (decoded) {
        req.token = decoded;
        next();
      } else {
        res.status(401).json({
          message: "You are unauthorized to access this route",
        });
      }
    } catch (err) {
      console.log(err)
      res.status(401).json({
        message: "You are unauthorized to access this route",
      });
    }
  };