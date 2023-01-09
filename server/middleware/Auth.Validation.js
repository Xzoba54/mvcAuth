const { registerValidationSchema, loginValidationSchema } = require("../helpers/Validation.Schema");

const registerValidation = async (req, res, next) => {
  const { error, value } = registerValidationSchema.validate(req.body);

  if (error) return res.status(422).json({ success: false, error: { message: error.details[0].message } });
  req.user = value;
  next();
};

const loginValidation = (req, res, next) => {
  const { error, value } = loginValidationSchema.validate(req.body);

  if (error) return res.status(422).json({ success: false, error: { message: error.details[0].message } });
  req.user = value;
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
};
