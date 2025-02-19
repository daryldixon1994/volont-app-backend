const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
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
  phone: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  },
  address: {
    type: String,
  },
  age: {
    type: String,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model("users", userSchema);
