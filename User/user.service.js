const User = require("./user.model")

exports.getAll = async()=>{
    try {
        return await User.find({})
    } catch (error) {
        throw new Error(error.message);
    }
}