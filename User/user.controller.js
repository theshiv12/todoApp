const user = require("../User/user.service");

exports.getUser = async (req, res) => {
  user
    .getAll()
    .then((data) => {
      return res.json({
        success: true,
        message: data,
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        message: err.message,
      });
    });
};

