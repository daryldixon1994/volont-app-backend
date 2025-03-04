const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

route.get("/check-user/:token", (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const { token } = req.params;
  if (token) {
    const checkToken = jwt.verify(token, SECRET_KEY);
    if (checkToken.isUser) {
      return res.status(200).json({ isUserLoggedIn: true });
    }
    return res.status(406).json({ isUserLoggedIn: false });
  } else {
    return res.status(401).json({ status: false, error });
  }
});

route.get("/check-association/:token", (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const { token } = req.params;
  const checkToken = jwt.verify(token, SECRET_KEY);
  if (token) {
    if (checkToken.isAssociation) {
      return res.status(200).json({ isAssoLoggedIn: true });
    }
    return res.status(406).json({ isAssoLoggedIn: false });
  } else {
    return res.status(401).json({ status: false, error });
  }
});

module.exports = route;
