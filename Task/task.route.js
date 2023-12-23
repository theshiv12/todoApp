const express = require("express")
const route = express.Router()
const taskController = require("./task.controller")
const validator =  require("../shared/validator")
const taskSchema = require("./task.validation")
const  policies= require("../shared/authPolicies")

route.post("/",policies.loggedIn,validator.middleware(taskSchema.taskPOST),taskController.create)
route.get("/",policies.loggedIn,taskController.findAll)
route.get("/:taskId",policies.loggedIn,validator.middleware(taskSchema.taskGET,validator.ValidationSource.PARAM),taskController.getById)
route.put("/:taskId",policies.loggedIn,taskController._update)
route.delete("/:taskId",policies.loggedIn,validator.middleware(taskSchema.taskDELETE,validator.ValidationSource.PARAM),taskController._delete)

module.exports = route