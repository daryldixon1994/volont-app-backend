const JoinRequests = require("../../models/JoinRquest");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    const { clientId } = req;
    const objClientId = new mongoose.Types.ObjectId(clientId);
    const data = await JoinRequests.find({
      userId: objClientId,
    }).populate({
      path: "actId",
      populate: { path: "associationId", select: "-email -password -refNumber -isVerified -isBanned -isActivated" },
    });
    //.populate("associationId", "-email -password");

    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(406).json({ status: false, error });
  }
};
