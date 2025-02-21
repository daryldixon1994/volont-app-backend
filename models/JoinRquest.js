const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  actId: {
    type: mongoose.Types.ObjectId,
    ref: "acts",
    required: true,
  },
  associationId: {
    type: mongoose.Types.ObjectId,
    ref: "associations",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isDeclined: {
    type: Boolean,
    default: false,
  },
  isPending: {
    type: Boolean,
    default: true,
  },
});

module.exports = JoinRequest = mongoose.model("joinRequests", requestSchema);
