const Act = require("../../models/Act");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    await Act.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
