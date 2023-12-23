const Redis = require('redis');
require('dotenv').config();

class RedisCli
{    
    constructor()
    {
        try{
          console.log(process.env.REDISPORT,process.env.REDISURI)
            this.client = Redis.createClient({
              url:`redis://${process.env.REDISURI}:${process.env.REDISPORT}`
            });

            this.client.connect()
            .then(()=>{
                console.log(`Redis client connected ${process.env.REDISURI}:${process.env.REDISPORT}`);
            });
            
        }
        catch(error)
        {
            console.log("RedisCli-Construcor-",error);
        }
    }

    add =  async (key,data) => {
        try{
          await this.client.set(key, JSON.stringify(data));
          await this.client.expire(key, 300); //
            // this.client.set(key,JSON.stringify(data)).then(()=>{
            //     // console.log(`->Add ${key} key to Redis`);
            // });;
        }
        catch(error){
            console.log("RedisCli-add-",error);
        }
    }

    get = async (key) => {
        try{
            //console.log(`get val for key - ${key}`);
            let retVal = null;
            let val = await this.client.get(key);
            if(val != null){
                retVal = JSON.parse(val)
            }
            return retVal;
        }
        catch(error){
            console.log("RedisCli-get-",error);
        }
    }

  delete = async (key) => {
      try {
          await this.client.del(key);
      } catch (error) {
          console.error("RedisCli-delete-", error);
      }
  }
}


module.exports = RedisCli