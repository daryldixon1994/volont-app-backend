const User = require("../../models/User");
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

    const newUser = await User.findByIdAndUpdate(
      clientId,
      {
        $set: {
          img: url,
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: newUser });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
