const User = require("../../models/User");
const bcrypt = require("bcrypt");
const verifyEmail = require("../../lib/verifyEmail");
module.exports = async (req, res) => {
  try {
    const { fullName, email, password, phone, address, age } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ status: false, error: "This email is already in use" });
    }
    const userCheckPhone = await User.findOne({ phone });
    if (userCheckPhone) {
      return res
        .status(401)
        .json({ status: false, error: "This phone is already in use" });
    }
    const pwdRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pwdRegEx.test(password)) {
      return res.status(406).json({
        status: true,
        error:
          "Invalid Password: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      age,
    });
    const createdUser = await newUser.save();

    verifyEmail(email, fullName, createdUser._id);
    res
      .status(200)
      .json({ status: true, message: "User was created successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error: error.errors });
  }
};
