module.exports = async (req, res, next) => {
  const { userId } = req.query;
  const { clientId } = req;
  if (userId !== clientId) {
    return res.status(405).json({ status: false, message: "Not allowed" });
  }
  next();
};
