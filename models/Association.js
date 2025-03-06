const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const associationSchema = new Schema(
  {
    associationName: {
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
    category: {
      type: String,
      required: [true, "Category is a required field"],
    },
    phone: {
      type: String,
      required: [true, "Phone is a required field"],
    },
    logo: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    },
    location: {
      type: String,
      required: [true, "Location is a required field"],
    },
    refNumber: {
      type: String,
      required: [true, "Ref Number is a required field"],
    },
    description: {
      type: String,
      required: [true, "Description is a required field"],
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
  },
  { timestamps: true }
);

associationSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  next();
});

module.exports = Association = mongoose.model(
  "associations",
  associationSchema
);
