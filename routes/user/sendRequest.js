const JoinRequest = require("../../models/JoinRquest");

module.exports = async (req, res) => {
  try {
    const { actId, associationId } = req.query;
    const { clientId } = req;
    const newRequest = new JoinRequest({
      actId,
      associationId,
      userId: clientId,
    });
    await newRequest.save();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.staus(406).json({ status: false, error });
  }
};
