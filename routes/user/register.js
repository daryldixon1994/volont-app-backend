const User = require("../../models/User");
const bcrypt = require("bcrypt");
const verifyEmail = require("../../lib/verifyEmail");
module.exports = async (req, res) => {
  try {
    const { fullName, email, password, phone, address, age } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        status: false,
        error: { email: { message: "This email is already in use" } },
      });
    }
    const userCheckPhone = await User.findOne({ phone });
    if (userCheckPhone) {
      return res.status(401).json({
        status: false,
        error: { email: "This phone is already in use" },
      });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      phone,
      address,
      age,
    });
    const createdUser = await newUser.save();

    verifyEmail(email, fullName, createdUser._id, req.get("origin"));
    res
      .status(200)
      .json({ status: true, message: "User was created successfully" });
  } catch (error) {
    // if (error) {
    // }
    // console.log(error);
    res.status(401).json({ status: false, error: error.errors });
  }
};
