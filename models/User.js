const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      minLength: [2, "Full Name length must have at least 3 characters"],
      required: [true, "Fullname is a required field"],
    },
    email: {
      type: String,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Invalid email, please try again",
      ],
      required: [true, "Email is a required field"],
    },
    password: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message: () =>
          `Invalid Password: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
      },
      required: [true, "Password is a required field"],
    },
    phone: {
      type: String,
      required: [true, "Phone is a required field"],
    },
    img: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    },
    address: {
      type: String,
      required: [true, "Address is a required field"],
    },
    age: {
      type: String,
      required: [true, "Age is a required field"],
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  next();
});

module.exports = User = mongoose.model("users", userSchema);
