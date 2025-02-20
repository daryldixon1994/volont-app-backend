const Association = require("../../models/Association");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    await Association.findByIdAndUpdate(id, {
      $set: {
        isVerified: true,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: false, error });
  }
};
