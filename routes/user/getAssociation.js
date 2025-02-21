const Association = require("../../models/Association");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Association.findById(id, {
      password: 0,
      refNumber: 0,
      isVerified: 0,
      isBanned: 0,
      isActivated: 0,
    });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
