const Act = require("../../models/Act");

module.exports = async (req, res) => {
  try {
    let { date } = req.query;

    const data = await Act.find({
      actDate: {
        $lte: new Date(date).toISOString(),
        $gte: new Date(),
      },
    }).populate("associationId", "associationName logo");
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: false, error });
  }
};
