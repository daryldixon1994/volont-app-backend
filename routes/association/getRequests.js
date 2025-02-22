const JoinRequests = require("../../models/JoinRquest");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const objClientId = new mongoose.Types.ObjectId(clientId);
    const data = await JoinRequests.find({
      associationId: objClientId,
    })
      .populate({
        path: "actId",
      })
      .populate("userId", "-email -password -isBanned -isVerified -updatedAt");

    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
