const user = require("../User/user.service");
const userModel = require("./user.model");

exports.create = async (req, res) => {
  try {
    const User = await user.createAnUser(req.body);
    if (User instanceof Error) {
      throw new Error(User?.message);
    }
    return res.status(200).json({
      success: true,
      data: User.message,
      message: "user successfully created",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: error.message,
      message: "created",
    });
  }
};

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

