const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const newInfos = await User.findByIdAndUpdate(
      clientId,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({ status: true, data: newInfos });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
