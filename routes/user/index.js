const express = require("express");
const route = express.Router();

route.post("/register", require("./register"));

module.exports = route;
