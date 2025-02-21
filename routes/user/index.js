const express = require("express");
const route = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
// register : /api/user/register
route.post("/register", require("./register"));

// verify email : /api/user/verifyEmail/:id
route.patch("/verifyEmail/:id", require("./verifyEmail"));

// login : /api/user/login
route.post("/login", require("./login"));

// get acts : /api/user/getActs
route.get("/getActs", require("./getActs"));

// get act : /api/user/getAct
route.get("/getAct/:id", require("./getAct"));

// get associaitions : /api/user/getAssociations
route.get("/getAssociations", require("./getAssociations"));

// get associaition : /api/user/getAssociation
route.get("/getAssociation/:id", require("./getAssociation"));

// send join request : /api/user/sendJoinRequest
route.post("/sendRequest", verifyToken, require("./sendRequest"));

// get join request : /api/user/getOwnRequests
route.get("/getOwnRequests", verifyToken, require("./getOwnRequests"));

// get acts by category : /api/user/getActsByCategory
route.get("/getActsByCategory", require("./getActsByCategory"));

module.exports = route;
