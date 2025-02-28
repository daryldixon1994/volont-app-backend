const User = require("../../models/User");
const bcrypt = require("bcrypt");
const verifyEmail = require("../../lib/verifyEmail");
module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const { newPassword, password } = req.body;
    const user = await User.findById(clientId);
    const checkPWD = bcrypt.compareSync(password, user.password);
    if (!checkPWD) {
      return res
        .status(401)
        .json({ status: false, error: "Wrong Password, please check again" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPWD = bcrypt.hashSync(newPassword, salt);
    const newInfos = await User.findByIdAndUpdate(
      clientId,
      { $set: { password: hashPWD } },
      { new: true }
    );
    return res.status(200).json({ status: true, data: newInfos });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
