const express = require("express")
const Auth = require("./auth.controller")
const route = express.Router()

route.post("/register",Auth.register)
route.post("/login",Auth.login)

module.exports = route