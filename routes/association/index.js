const express = require("express");
const route = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
// register : /api/association/register
route.post("/register", require("./register"));

// verifyEmail : /api/association/verifyEmail/:id
route.patch("/verifyEmail/:id", require("./verifyEmail"));

// login : /api/association/verifyEmail/:id
route.post("/login", require("./login"));

// addAct : /api/association/addAct/:assoId
route.post("/addAct/:assoId", verifyToken, require("./addAct"));

module.exports = route;
