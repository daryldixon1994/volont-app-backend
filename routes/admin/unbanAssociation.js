const Association = require("../../models/Association");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    await Association.findByIdAndUpdate(id, {
      $set: {
        isBanned: false,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
