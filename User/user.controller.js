const user = require("../User/user.service");

exports.getUser = async (req, res) => {
  try {
    const User = await user.getAll();
    if (User instanceof Error) {
      throw new Error(User?.message);
    }
    return res.json({ code: message.get("SUCCESS_STATUS_CODE"), data:User});
  } catch (error) {
    next(error)
  }

};
