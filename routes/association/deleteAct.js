const Act = require("../../models/Act");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientId } = req;
    const objId = new mongoose.Types.ObjectId(id);
    const clientObjId = new mongoose.Types.ObjectId(clientId);
    await Act.findOneAndDelete({
      _id: objId,
      associationId: clientObjId,
    });
    res.status(204).end();
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
