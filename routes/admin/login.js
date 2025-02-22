const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email, password } = req.body;
    const checkAdminEmail = await Admin.findOne({ email });
    if (!checkAdminEmail) {
      return res.status(406).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    const checkPwd = bcrypt.compareSync(password, checkAdminEmail.password);
    if (!checkPwd) {
      return res.status(406).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
  
    //   token
    const token = jwt.sign(
      {
        id: checkAdminEmail._id,
        email: checkAdminEmail.email,
        isLoggedIn: true,
      },
      SECRET_KEY,
      {
        expiresIn: "1 day",
      }
    );
    res.status(200).json({ status: true, data: { token } });
  } catch (error) {
    res.status(406).json({ status: true, error });
  }
};
