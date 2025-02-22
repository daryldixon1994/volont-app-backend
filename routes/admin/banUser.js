const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    await User.findByIdAndUpdate(id, {
      $set: {
        isBanned: true,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
