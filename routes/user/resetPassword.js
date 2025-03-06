const User = require("../../models/User");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(401).json({
        status: false,
        error: { email: { message: "This email is not registered" } },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } }
    );
    res
      .status(200)
      .json({ status: true, message: "Password was reset successfully" });
  } catch (error) {
    res.status(401).json({ status: false, error: error.errors });
  }
};
