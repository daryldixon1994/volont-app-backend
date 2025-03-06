const Act = require("../../models/Act");
const JoinRequest = require("../../models/JoinRquest");

module.exports = async (req, res) => {
  try {
    const { userId, actId, requestId } = req.query;
    const newRequest = await JoinRequest.findByIdAndUpdate(
      requestId,
      {
        $set: {
          isAccepted: true,
          isPending: false,
        },
      },
      { new: true }
    );
    const newAct = await Act.findByIdAndUpdate(
      actId,
      {
        $push: {
          users: userId,
        },
        $pull: {
          pendingUsers: userId,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      data: {
        newRequest,
        newAct,
      },
    });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
