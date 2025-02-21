const mongoose = require("mongoose");
const Association = require("../../models/Association");
module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const newAssociation = await Association.findByIdAndUpdate(clientId, {
      $set: req.body,
    });
    res.status(204).end();
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
