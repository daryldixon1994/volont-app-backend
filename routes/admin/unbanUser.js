const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    await User.findByIdAndUpdate(id, {
      $set: {
        isBanned: false,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
