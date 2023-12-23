const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")
exports.hashPassword = async(password)=>{
      return await bcrypt.hash(password,10)
}

exports.compare = async(userPassword, requestPassword)=>{
    return await bcrypt.compare(userPassword,requestPassword)
}

exports.sign = async(user)=>{
   const payload = {
    id:user._id,
    email:user.email,
    name:user.name
   };

   const signOptions = {
    expiresIn:"5d",
    algorithm: "HS256",
  };

  try {
    return jwt.sign(payload, "shivam", signOptions);
  } catch (err) { throw new Error(err.message)}
}

exports.verify = function (req, res, secret = null) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token || token === "") {
      return null;
    } else if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
  
      try {
        let info = jwt.verify(token, secret || process.env.JWT_PrivateKey);
        return info;
      } catch (err) {
        return null;
      }
    }
  };