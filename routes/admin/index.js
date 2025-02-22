const express = require("express");
const route = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
route.post("/register", require("./register"));
route.post("/login", require("./login"));
route.get("/getUsers", verifyToken, require("./getUsers"));
route.get("/getAssociations", verifyToken, require("./getAssociations"));
route.get("/getActs", verifyToken, require("./getActs"));
route.delete("/deleteAct/:id", verifyToken, require("./deleteAct"));
route.put("/banUser/:id", verifyToken, require("./banUser"));
route.put("/unbanUser/:id", verifyToken, require("./unbanUser"));
route.put("/banAssociation/:id", verifyToken, require("./banAssociation"));
route.put("/unbanAssociation/:id", verifyToken, require("./unbanAssociation"));
route.put(
  "/activateAssociation/:id",
  verifyToken,
  require("./activateAssociation")
);

module.exports = route;
