const Act = require("../../models/Act");
const mongoose = require("mongoose");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientId } = req;
    const objId = new mongoose.Types.ObjectId(id);
    const clientObjId = new mongoose.Types.ObjectId(clientId);
    const uploader = async (path) =>
      await cloudinary.uploads(path, "volontApp");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);

    const newAct = await Act.findOneAndUpdate(
      {
        _id: objId,
        associationId: clientObjId,
      },

      {
        $set: {
          img: url,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ status: true, data: newAct });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
