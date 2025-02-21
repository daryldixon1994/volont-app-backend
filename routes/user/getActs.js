const Act = require("../../models/Act");

module.exports = async (req, res) => {
  try {
    const data = await Act.find().populate(
      "associationId",
      "associationName logo"
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
