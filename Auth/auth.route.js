const express = require("express")
const Auth = require("./auth.controller")
const route = express.Router()
const validator =  require("../shared/validator")
const userSchema = require("./auth.validation")


route.post("/register",validator.middleware(userSchema.userLogin),Auth.register)
route.post("/login",validator.middleware(userSchema.userLogin),Auth.login)

module.exports = route