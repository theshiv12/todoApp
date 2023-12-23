const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
require('dotenv').config();
const cors = require("cors")
const errorHandler = require("./shared/errorHandler")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/user",require("./Auth/auth.route"))
app.use("/api",require("./User/user.route"))

app.use(errorHandler);

const DB_URL = process.env.URL
mongoose.connect(DB_URL).then((data)=>{
    console.log("mongo connected")
}).catch((err)=>{
    console.log(err);
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("server is running on port 3000s");
})

