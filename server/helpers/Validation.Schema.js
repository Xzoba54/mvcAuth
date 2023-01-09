const joi = require("joi");

const registerValidationSchema = joi.object().keys({
  name: joi.string().trim().min(6).max(12).required(),
  email: joi.string().trim().email().required(),
  password: joi.string().trim().min(8).max(40).required(),
});

const loginValidationSchema = joi.object().keys({
  name: joi.string().required(),
  password: joi.string().required(),
});

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
};
