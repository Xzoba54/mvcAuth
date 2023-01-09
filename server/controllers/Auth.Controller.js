const AuthModel = require("../models/Auth.Model");
const JwtModel = require("../models/Jwt.Model");

exports.register = async (req, res) => {
  const { name, email, password } = req.user;

  const authModel = new AuthModel(name, email, password);
  if (!(await authModel.save())) return res.status(500).json({ success: false, error: { message: "Internal Server Error. Please try again later" } });

  res.status(201).json({ success: true });
};

exports.login = async (req, res) => {
  const { name, password } = req.user;

  const user = await AuthModel.findOne(name, password);
  if (!user) return res.status(401).json({ success: false, error: { message: "Unauthorized" } });

  const payload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };
  const accessToken = await new JwtModel(payload, "45s").GenerateAccessToken();
  const refreshToken = await new JwtModel(payload, "2m").GenerateRefreshToken();

  res.status(200).json({ success: true, accessToken: accessToken, refreshToken: refreshToken });
};

exports.verify = async (req, res) => {
  res.status(200).json({ success: true });
};

exports.refresh = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(422).json({ success: false, error: { message: "Token required" } });

  const user = await JwtModel.VerifyRefreshToken(token);
  if (!user) return res.status(403).json({ success: false, error: { message: "Invalid token" } });

  const payload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };
  const accessToken = await new JwtModel(payload, "45s").GenerateAccessToken();

  res.status(200).json({ success: true, accessToken: accessToken });
};

exports.delete = async (req, res) => {
  const { id } = req.user;

  if (!AuthModel.deleteOne(id)) return res.status(403).json({ success: false, error: { message: "Cannot delete" } });

  res.status(200).json({ success: true });
};

exports.logout = async (req, res) => {
  //refreshToken
  const { token } = req.body;

  if (!token) return res.status(422).json({ success: false, error: { message: "Token required" } });

  if (!(await JwtModel.deleteOne(token))) return res.status(403).json({ success: false, error: { message: "Invalid token" } });

  res.json({ success: true });
};
