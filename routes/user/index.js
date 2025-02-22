const express = require("express");
const route = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
const multer = require("../../middlewares/multer")
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

// get acts by date : /api/user/getActsByDate
route.get("/getActsByDate", require("./getActsByDate"));

// get acts by assocation name : /api/user/getActsByAssoName
route.get("/getActsByAssoName", require("./getActsByAssoName"));

// get own profile : /api/user/getOwnInfos
route.get("/getOwnInfos", verifyToken, require("./getOwnInfos"));

// update profile : /api/user/updateInfos
route.patch("/updateInfos", verifyToken, require("./UpdateInfos"));

// update profile image : /api/user/updateUserImage
route.patch("/updateUserImage", verifyToken,multer.single("photo"), require("./updateUserImage"));

// update email : /api/user/updateEmail
route.patch("/updateEmail", verifyToken, require("./updateEmail"));

// update email : /api/user/updatePassword
route.patch("/updatePassword", verifyToken, require("./updatePassword"));

module.exports = route;
