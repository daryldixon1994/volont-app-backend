const JoinRequest = require("../../models/JoinRquest");
const Act = require("../../models/Act");

module.exports = async (req, res) => {
  try {
    const { actId, associationId,userId } = req.query;
    const { clientId } = req;
    const newRequest = new JoinRequest({
      actId,
      associationId,
      userId: clientId,
    });
    await newRequest.save();
    await Act.findByIdAndUpdate(actId, {
      $addToSet: {
        pendingUsers: clientId,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.staus(406).json({ status: false, error });
  }
};
