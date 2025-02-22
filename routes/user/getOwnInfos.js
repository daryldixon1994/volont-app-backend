const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const data = await User.findById(clientId, {
      password: 0,
    });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
