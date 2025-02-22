const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const data = await User.find(
      {},
      {
        password: 0,
      }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
      console.log(error)
    res.status(406).json({ status: true, error });
  }
};
