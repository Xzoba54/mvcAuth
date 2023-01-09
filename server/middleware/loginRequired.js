const JwtModel = require("../models/Jwt.Model");

const loginRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    const user = await JwtModel.VerifyAccessToken(token);
    if (!user) return res.status(403).json({ success: false, error: { message: "Invalid token" } });
    req.user = user;

    next();
  } catch {
    res.status(422).json({ success: false, error: { message: "Token required" } });
  }
};
module.exports = loginRequired;
