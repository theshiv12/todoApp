const User = require("../User/user.model");
const JWT = require("../shared/jwt");


exports.registerService = async (userParams) => {
  console.log(userParams)
  try {
    const isUserExist = await User.findOne({email:userParams.email});
    if (isUserExist) throw new Error(`User with email ${userParams.email} already exist `);
    userParams.password = await JWT.hashPassword(userParams.password);
    const userData =  await User.create(userParams);
    return userData;  
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginService = async(loginParams)=>{
    try {
        const isUserExist = await User.findOne({email:loginParams.email});
        if (!isUserExist)
          throw new Error(`User with email ${loginParams.email} already exist  or Wrong email`);
        if(isUserExist){
           console.log(loginParams.password, isUserExist.password)
            if(await JWT.compare(loginParams.password, isUserExist.password)){
                 return await JWT.sign(isUserExist);
            }
            else{
                throw new Error(`Password is incorrect !!`)
            }
        }

    } catch (error) {
        throw new Error(error.message);

    }
}