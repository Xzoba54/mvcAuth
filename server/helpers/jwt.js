require("dotenv").config();

const jwt = require("jsonwebtoken");

const GenerateAccessToken = (id) => {
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: "45s" });

  return token;
};

const GenerateRefreshToken = (id) => {
  const token = jwt.sign({ id }, process.env.REFRESH_TOKEN, { expiresIn: "2m" });

  return token;
};

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ success: false, error: { message: "Invalid data" } });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ success: false, error: { message: "invalid token " } });
    req.user = user;

    next();
  });
};

const RefreshToken = (token) => {
  return "welcome from refreshtoken " + token;
};

module.exports = {
  GenerateAccessToken,
  GenerateRefreshToken,
  VerifyToken,
  RefreshToken,
};
