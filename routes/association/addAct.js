const Act = require("../../models/Act");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    const {
      actName,
      actDate,
      actHour,
      location,
      description,
      volonteersNbr,
      category,
    } = req.body;
    const { clientId } = req;
    console.log(req.body);
    const uploader = async (path) =>
      await cloudinary.uploads(path, "volontApp");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);
    const newAct = new Act({
      actName,
      actDate: new Date(actDate).toJSON(),
      actHour,
      associationId: clientId,
      location,
      description,
      img: url,
      volonteersNbr,
      category,
    });
    const act = await newAct.save();
    res.status(200).json({ status: true, data: act });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: false, error });
  }
};
