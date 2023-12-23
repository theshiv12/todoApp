const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        userId:mongoose.Types.ObjectId,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },
    profileImg:{
        type:String
    },
    address:[{
        streat:String,
        city:String,
        town:String 
    }]
    
})


module.exports = mongoose.model("User",userSchema)