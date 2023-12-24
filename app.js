const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cron = require('node-cron');
require('dotenv').config();
const cors = require("cors")
const errorHandler = require("./shared/errorHandler")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth",require("./Auth/auth.route"))
app.use("/user",require("./User/user.route"))
app.use("/task",require("./Task/task.route"))

app.use(errorHandler);

//CRON JOB to send reminder email everyday at 9 am 
const reminder = require("./Cron/sendReminderEmails")
cron.schedule('0 9 * * *', () => {
    reminder.scheduleTaskReminders()
  }, {
    scheduled: true,
  });

const DB_URL = process.env.URL
mongoose.connect(DB_URL).then((data)=>{
    console.log("mongo connected")
}).catch((err)=>{
    console.log(err);
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

