const Act = require("../../models/Act");
const JoinRequest = require("../../models/JoinRquest");

module.exports = async (req, res) => {
  try {
    const { requestId, userId, actId } = req.query;
    const newRequest = await JoinRequest.findByIdAndUpdate(
      requestId,
      {
        $set: {
          isDeclined: true,
          isPending: false,
        },
      },
      { new: true }
    );
    const newAct = await Act.findByIdAndUpdate(
      actId,
      {
        $pull: {
          pendingUsers: userId,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      data: newRequest,
    });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
