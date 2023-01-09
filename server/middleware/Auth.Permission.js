const AuthPermission = (permission) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (permission != role) return res.status(401).json({ success: false, error: { message: "Unauthorized" } });

    next();
  };
};
module.exports = AuthPermission;
