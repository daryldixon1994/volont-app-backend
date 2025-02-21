const Association = require("../../models/Association");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email, password } = req.body;
    const checkAssoEmail = await Association.findOne({ email });
    if (!checkAssoEmail) {
      return res.status(406).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    const checkPwd = bcrypt.compareSync(password, checkAssoEmail.password);
    if (!checkPwd) {
      return res.status(406).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    if (!checkAssoEmail.isVerified) {
      return res.status(406).json({
        status: false,
        error: "Email is not verified! Please check your mailbox",
      });
    }
    if (!checkAssoEmail.isActivated) {
      return res.status(406).json({
        status: false,
        error:
          "Account activation is in progress! You will be notified as soon as possible.",
      });
    }
    //   token
    const token = jwt.sign(
      {
        id: checkAssoEmail._id,
        email: checkAssoEmail.email,
        refNumber: checkAssoEmail.refNumber,
        isLoggedIn: true,
      },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      status: true,
      data: { token, category: checkAssoEmail.category },
    });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
