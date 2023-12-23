const User = require("./user.model")

exports.getAll = async()=>{
    try {
        return await User.find({})
    } catch (error) {
        return error
    }
}