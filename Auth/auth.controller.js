const Auth = require("./auth.service");

exports.register = async (req, res) => {
  console.log("User Register");
  try {
    const User = await Auth.registerService(req.body);
    if (User instanceof Error) {
      throw new Error(User?.message);
    }
    return res.status(200).json({
      success: true,
      data: User.message,
      message: "User successfully created !!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await Auth.loginService(req.body);
    return res.status(200).json({
      success: true,
      data: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};