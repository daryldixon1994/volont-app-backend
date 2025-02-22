const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const associationSchema = new Schema({
  associationName: {
    type: String,
    minLength: [2, "Full Name length must have at least 3 characters"],
  },
  email: {
    type: String,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Invalid email, please try again",
    ],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  },
  location: {
    type: String,
    required: true,
  },
  refNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isBanned: {
    type: Boolean,
    default: false,
  },
  isActivated: { type: Boolean, default: false },
},{timestamps: true});

module.exports = Association = mongoose.model(
  "associations",
  associationSchema
);
