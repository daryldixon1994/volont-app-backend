const Act = require("../../models/Act");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const clientObjId = new mongoose.Types.ObjectId(clientId);
    const data = await Act.find({
      associationId: clientObjId,
    });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
