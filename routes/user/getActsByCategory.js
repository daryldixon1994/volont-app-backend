const Act = require("../../models/Act");

module.exports = async (req, res) => {
  try {
    let { category } = req.query;
    const data = await Act.find({
      category,
    }).populate("associationId", "associationName logo");
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
