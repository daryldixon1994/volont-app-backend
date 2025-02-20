const express = require("express");
const route = express.Router();

// register : /api/user/register
route.post("/register", require("./register"));

// verify email : /api/user/verifyEmail/:id
route.patch("/verifyEmail/:id", require("./verifyEmail"));

// verify email : /api/user/login
route.post("/login", require("./login"));

module.exports = route;
