const express = require("express");
const route = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
const multer = require("../../middlewares/multer");
// register : /api/association/register
route.post("/register", require("./register"));

// verifyEmail : /api/association/verifyEmail/:id
route.patch("/verifyEmail/:id", require("./verifyEmail"));

// login : /api/association/verifyEmail/:id
route.post("/login", require("./login"));

// addAct : /api/association/addAct
route.post("/addAct", verifyToken, multer.single("photo"), require("./addAct"));

// addAct : /api/association/addAct
route.post("/addAct", verifyToken, multer.single("photo"), require("./addAct"));

// updateAct : /api/association/updateAct/:id
route.patch("/updateAct/:id", verifyToken, require("./updateAct"));

// updateActImage : /api/association/updateActImage/:id
route.patch(
  "/updateActImage/:id",
  verifyToken,
  multer.single("photo"),
  require("./updateActImage")
);

// deleteAct : /api/association/deleteAct/:id
route.delete("/deleteAct/:id", verifyToken, require("./deleteAct"));

// getOwnAct : /api/association/getOwnAct
route.get("/getOwnActs", verifyToken, require("./getOwnActs"));

// getUser : /api/association/getUser/:id
route.get("/getUser/:id", verifyToken, require("./getUser"));

// get requests : /api/association/getRequests
route.get("/getRequests", verifyToken, require("./getRequests"));

// updateAssociation : /api/association/updateAssociation
route.patch("/updateAssociation", verifyToken, require("./updateAssoDetails"));

// updateAssoImage : /api/association/updateAssoImage/:id
route.patch(
  "/updateAssoImage",
  verifyToken,
  multer.single("photo"),
  require("./updateAssoImage")
);

// accept user : /api/association/acceptUser
route.patch("/acceptUser", verifyToken, require("./acceptUser"));

// accept user : /api/association/declineUser
route.patch("/declineUser", verifyToken, require("./declineUser"));

// accept user : /api/association/declineUser
route.patch("/resetPassword", require("./resetPassword"));
module.exports = route;
