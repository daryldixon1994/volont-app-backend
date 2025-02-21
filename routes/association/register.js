const Association = require("../../models/Association");
const bcrypt = require("bcrypt");
const verifyEmail = require("../../lib/verifyEmailAsso");
module.exports = async (req, res) => {
  try {
    const {
      associationName,
      email,
      password,
      category,
      phone,
      location,
      description,
      refNumber,
    } = req.body;
    const association = await Association.findOne({ email });
    if (association) {
      return res
        .status(401)
        .json({ status: false, error: "This email is already in use" });
    }
    const associationCheckPhone = await Association.findOne({ phone });
    if (associationCheckPhone) {
      return res
        .status(401)
        .json({ status: false, error: "This phone is already in use" });
    }
    const pwdRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pwdRegEx.test(password)) {
      return res.status(406).json({
        status: true,
        error:
          "Invalid Password: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newAssociation = new Association({
      associationName,
      email,
      password: hashedPassword,
      phone,
      category,
      location,
      description,
      refNumber,
    });
    const createdAssociation = await newAssociation.save();

    // verifyEmail(
    //   email,
    //   associationName,
    //   createdAssociation._id,
    //   req.get("origin")
    // );
    res
      .status(200)
      .json({ status: true, message: "Association was created successfully" });
  } catch (error) {
    // if (error) {
    //   console.log(error);
    // }
    res.status(401).json({ status: false, error: error.errors });
  }
};
