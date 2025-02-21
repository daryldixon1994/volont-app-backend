const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id, {
      email: 0,
      password: 0,
      isBanned: 0,
      isVerified: 0,
    });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
