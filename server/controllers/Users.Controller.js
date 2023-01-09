const Users = require("../models/Users.Model");

exports.all = async (req, res) => {
  const users = await Users.all();

  res.status(200).json({ success: true, users: users });
};
