const Association = require("../../models/Association");
const activateEmail = require("../../lib/activateAssosiationEmail");
module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    const association = await Association.findByIdAndUpdate(
      id,
      {
        $set: {
          isActivated: true,
        },
      },
      { new: true }
    );
    activateEmail(association.email, association.associationName);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: true, error });
  }
};
