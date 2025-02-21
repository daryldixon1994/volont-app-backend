const mongoose = require("mongoose");
const Act = require("../../models/Act");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientId } = req;
    const objId = new mongoose.Types.ObjectId(id);
    const clientObjId = new mongoose.Types.ObjectId(clientId);
    const newAct = await Act.findOneAndUpdate(
      {
        _id: objId,
        associationId: clientObjId,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: newAct });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
