exports.home = (req, res) => {
  res.json({ name: req.user.name });
};
