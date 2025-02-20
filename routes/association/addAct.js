const Act = require("../../models/Act");

module.exports = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: false, error });
  }
};
