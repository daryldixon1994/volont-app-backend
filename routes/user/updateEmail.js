const User = require("../../models/User");
const bcrypt = require("bcrypt");
const verifyEmail = require("../../lib/verifyEmail");
module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const { newEmail, password } = req.body;
    const user = await User.findById(clientId);
    const checkPWD = bcrypt.compareSync(password, user.password);
    if (!checkPWD || newEmail === user.email) {
      return res
        .status(401)
        .json({ status: false, error: "Wrong Password or used email" });
    }
    const newInfos = await User.findByIdAndUpdate(
      clientId,
      { $set: { email: newEmail, isVerified: false } },
      { new: true }
    );
    verifyEmail(newEmail, newInfos.fullName, clientId);
    return res.status(200).json({ status: true, data: newInfos });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
