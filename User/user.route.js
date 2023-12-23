const express = require("express")
const route = express.Router()
const userController = require("./user.controller")
route.get("/",userController.getUser)
module.exports = route