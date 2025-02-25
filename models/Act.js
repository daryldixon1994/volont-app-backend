const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actSchema = new Schema(
  {
    actName: {
      type: String,
      required: true,
    },
    actDate: {
      type: Date,
      required: true,
    },
    actHour: {
      type: String,
      required: true,
    },
    users: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "users",
    },
    associationId: {
      type: mongoose.Types.ObjectId,
      ref: "associations",
      required: true,
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
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Act = mongoose.model("acts", actSchema);
