const Act = require("../../models/Act");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Act.findById(id).populate(
      "associationId",
      "associationName logo"
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
