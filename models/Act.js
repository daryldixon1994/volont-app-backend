const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actSchema = new Schema({
  actName: {
    type: String,
    required: true,
  },
  actDate: {
    type: Date,
    required: true,
  },
  actHour: {
    type: Date,
    required: true,
  },
  users: {
    type: [mongoose.Types.ObjectId],
    ref: "users",
  },
  associationId: {
    type: mongoose.Types.ObjectId,
    ref: "associations",
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  volonteersNbr: {
    type: String,
  },
});

module.exports = Act = mongoose.model("acts", actSchema);
