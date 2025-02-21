const Association = require("../../models/Association");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const uploader = async (path) =>
      await cloudinary.uploads(path, "volontApp");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);

    const newAct = await Association.findByIdAndUpdate(clientId, {
      $set: {
        logo: url,
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
