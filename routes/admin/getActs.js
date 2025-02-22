const Act = require("../../models/Act");

module.exports = async (req, res) => {
  try {
    const data = await Act.find()
      .populate("associationId", "-password")
      .populate("users", "-password -isBanned -isVerified");
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
