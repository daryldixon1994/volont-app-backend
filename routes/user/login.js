const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email, password } = req.body;
    const checkUserEmail = await User.findOne({ email });
    if (!checkUserEmail) {
      return res.status(406).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    const checkPwd = bcrypt.compareSync(password, checkUserEmail.password);
    if (!checkPwd) {
      return res.status(406).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    if (!checkUserEmail.isVerified) {
      return res.status(406).json({
        status: false,
        error: "Email is not verified! Please check your mailbox",
      });
    }
    if (checkUserEmail.isBanned) {
      return res.status(406).json({
        status: false,
        error: "You were banned for 15 days!",
      });
    }
    //   token
    const token = jwt.sign(
      {
        id: checkUserEmail._id,
        email: checkUserEmail.email,
        isUser: true,
      },
      SECRET_KEY,
      {
        expiresIn: "1 day",
      }
    );
    res
      .status(200)
      .json({ status: true, data: { token, userId: checkUserEmail._id } });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
