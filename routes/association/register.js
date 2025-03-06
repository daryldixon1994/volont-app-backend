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
      return res.status(401).json({
        status: false,
        error: { email: { message: "This email is already in use" } },
      });
    }
    const associationCheckPhone = await Association.findOne({ phone });
    if (associationCheckPhone) {
      return res.status(401).json({
        status: false,
        error: { phone: { message: "This phone is already in use" } },
      });
    }

    const newAssociation = new Association({
      associationName,
      email,
      password,
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
