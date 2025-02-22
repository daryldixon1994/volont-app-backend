const Act = require("../../models/Act");
const Association = require("../../models/Association");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    let { name } = req.query;

    const association = await Association.findOne({
      associationName: name,
    });

    const objId = new mongoose.Types.ObjectId(association._id);

    const data = await Act.find({
      associationId: objId,
    }).populate("associationId", "associationName logo");

    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: false, error });
  }
};
